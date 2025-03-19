package handlers

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetPvPTargets returns potential PvP targets for the current user
func GetPvPTargets(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get user stats to determine level range
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Find potential targets (users with similar level, excluding self)
	var targets []struct {
		User      models.User      `json:"user"`
		Stats     models.UserStats `json:"stats"`
		IsOnline  bool             `json:"is_online"`
		LastLogin time.Time        `json:"last_login"`
	}

	// Calculate level range (±5 levels)
	minLevel := userStats.Level - 5
	if minLevel < 1 {
		minLevel = 1
	}
	maxLevel := userStats.Level + 5

	// Query for targets
	rows, err := database.DB.Raw(`
		SELECT u.id, u.username, u.avatar_url, u.last_login, 
			   s.level, s.crypto_balance, s.attack_success_rate, s.defense_success_rate,
			   CASE WHEN u.last_login > ? THEN true ELSE false END as is_online
		FROM users u
		JOIN user_stats s ON u.id = s.user_id
		WHERE u.id != ? AND s.level BETWEEN ? AND ?
		ORDER BY s.level DESC
		LIMIT 10
	`, time.Now().Add(-15*time.Minute), userUUID, minLevel, maxLevel).Rows()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get targets"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var target struct {
			User      models.User      `json:"user"`
			Stats     models.UserStats `json:"stats"`
			IsOnline  bool             `json:"is_online"`
			LastLogin time.Time        `json:"last_login"`
		}

		if err := database.DB.ScanRows(rows, &target); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan targets"})
			return
		}

		targets = append(targets, target)
	}

	c.JSON(http.StatusOK, gin.H{"targets": targets})
}

// AttackPlayer initiates a PvP attack on another player
func AttackPlayer(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get target ID from URL
	targetID := c.Param("id")
	if targetID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Target ID is required"})
		return
	}

	// Parse UUIDs
	attackerUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	defenderUUID, err := uuid.Parse(targetID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid target ID"})
		return
	}

	// Check if attacker and defender are the same
	if attackerUUID == defenderUUID {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You cannot attack yourself"})
		return
	}

	// Check if attacker is on cooldown
	var recentAttack models.PvPAttack
	cooldownTime := time.Now().Add(-60 * time.Second) // 60 second cooldown
	result := database.DB.Where("attacker_id = ? AND attack_timestamp > ?", attackerUUID, cooldownTime).First(&recentAttack)
	if result.Error == nil {
		c.JSON(http.StatusTooManyRequests, gin.H{"error": "You are on cooldown"})
		return
	}

	// Get attacker stats
	var attackerStats models.UserStats
	if err := database.DB.Where("user_id = ?", attackerUUID).First(&attackerStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Attacker stats not found"})
		return
	}

	// Get defender stats
	var defenderStats models.UserStats
	if err := database.DB.Where("user_id = ?", defenderUUID).First(&defenderStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Defender stats not found"})
		return
	}

	// Get defender security systems
	var defenderSystems []models.UserSecuritySystem
	if err := database.DB.Where("user_id = ? AND status = ?", defenderUUID, "active").Find(&defenderSystems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get defender security systems"})
		return
	}

	// Calculate defense strength based on security systems
	defenseStrength := defenderStats.DefenseSuccessRate
	for _, system := range defenderSystems {
		defenseStrength += system.Effectiveness
	}

	// Calculate attack success chance
	// Base chance is 50%, modified by attacker's attack success rate and defender's defense strength
	successChance := 50 + attackerStats.AttackSuccessRate - (defenseStrength / 10)
	
	// Ensure chance is between 10% and 90%
	if successChance < 10 {
		successChance = 10
	} else if successChance > 90 {
		successChance = 90
	}

	// Determine attack result
	rand.Seed(time.Now().UnixNano())
	attackSuccess := rand.Intn(100) < successChance

	// Calculate crypto stolen and reputation change
	var cryptoStolen int
	var reputationChange int

	if attackSuccess {
		// Steal 10-20% of defender's crypto
		stealPercentage := 10 + rand.Intn(11) // 10-20%
		cryptoStolen = (defenderStats.CryptoBalance * stealPercentage) / 100
		
		// Cap stolen amount
		if cryptoStolen > 1000 {
			cryptoStolen = 1000
		}
		
		// Reputation gain for attacker
		reputationChange = 10 + rand.Intn(11) // 10-20 reputation
	} else {
		cryptoStolen = 0
		// Reputation loss for failed attack
		reputationChange = -5 - rand.Intn(6) // -5 to -10 reputation
	}

	// Begin transaction
	tx := database.DB.Begin()

	
	// Create PvP attack record
	attack := models.PvPAttack{
		AttackerID:       attackerUUID,
		DefenderID:       defenderUUID,
		Result:           func() string {
			if attackSuccess {
				return "success"
			}
			return "failed"
		}(),
		CryptoStolen:     cryptoStolen,
		ReputationChange: reputationChange,
		AttackTimestamp:  time.Now(),
	}

	if err := tx.Create(&attack).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create attack record"})
		return
	}

	// Update stats based on attack result
	if attackSuccess {
		// Update attacker stats
		if err := tx.Model(&models.UserStats{}).Where("user_id = ?", attackerUUID).Updates(map[string]interface{}{
			"crypto_balance":     attackerStats.CryptoBalance + cryptoStolen,
			"reputation":         attackerStats.Reputation + reputationChange,
			"pvp_wins":           attackerStats.PvPWins + 1,
			"attack_success_rate": (attackerStats.AttackSuccessRate*attackerStats.PvPWins + 100) / (attackerStats.PvPWins + 1),
		}).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update attacker stats"})
			return
		}

		// Update defender stats
		if err := tx.Model(&models.UserStats{}).Where("user_id = ?", defenderUUID).Updates(map[string]interface{}{
			"crypto_balance":      defenderStats.CryptoBalance - cryptoStolen,
			"pvp_losses":          defenderStats.PvPLosses + 1,
			"defense_success_rate": (defenderStats.DefenseSuccessRate*defenderStats.PvPLosses) / (defenderStats.PvPLosses + 1),
		}).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update defender stats"})
			return
		}

		// Create transaction records
		// For attacker
		attackerTransaction := models.Transaction{
			UserID:          attackerUUID,
			Amount:          cryptoStolen,
			TransactionType: "PvP Attack",
			Description:     "Stolen from player in PvP attack",
			ReferenceID:     &attack.ID,
			ReferenceType:   "PvPAttack",
		}

		if err := tx.Create(&attackerTransaction).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create attacker transaction"})
			return
		}

		// For defender
		defenderTransaction := models.Transaction{
			UserID:          defenderUUID,
			Amount:          -cryptoStolen,
			TransactionType: "PvP Defense",
			Description:     "Lost to player in PvP attack",
			ReferenceID:     &attack.ID,
			ReferenceType:   "PvPAttack",
		}

		if err := tx.Create(&defenderTransaction).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create defender transaction"})
			return
		}
	} else {
		// Update attacker stats for failed attack
		if err := tx.Model(&models.UserStats{}).Where("user_id = ?", attackerUUID).Updates(map[string]interface{}{
			"reputation":         attackerStats.Reputation + reputationChange,
			"pvp_losses":         attackerStats.PvPLosses + 1,
			"attack_success_rate": (attackerStats.AttackSuccessRate*attackerStats.PvPWins) / (attackerStats.PvPWins + attackerStats.PvPLosses + 1),
		}).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update attacker stats"})
			return
		}

		// Update defender stats for successful defense
		if err := tx.Model(&models.UserStats{}).Where("user_id = ?", defenderUUID).Updates(map[string]interface{}{
			"pvp_wins":            defenderStats.PvPWins + 1,
			"defense_success_rate": (defenderStats.DefenseSuccessRate*defenderStats.PvPLosses + 100) / (defenderStats.PvPLosses + 1),
		}).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update defender stats"})
			return
		}
	}

	// Create notifications
	// For attacker
	attackerNotification := models.Notification{
		UserID:           attackerUUID,
		Title:            func() string {
			if attackSuccess {
				return "Attack Successful"
			}
			return "Attack Failed"
		}(),
		Message:          func() string {
			if attackSuccess {
				return "Your attack was successful! You stole " + string(rune(cryptoStolen)) + " HTC."
			}
			return "Your attack failed."
		}(),
		NotificationType: "PvP",
	}
	

	if err := tx.Create(&attackerNotification).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create attacker notification"})
		return
	}

	// For defender
	defenderNotification := models.Notification{
		UserID:           defenderUUID,
		Title:            func() string {
			if attackSuccess {
				return "You Were Attacked"
			}
			return "Attack Defended"
		}(),
		Message:          func() string {
			if attackSuccess {
				return "You were attacked and lost " + string(rune(cryptoStolen)) + " HTC."
			}
			return "You successfully defended against an attack!"
		}(),
		NotificationType: "PvP",
	}
	

	if err := tx.Create(&defenderNotification).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create defender notification"})
		return
	}

	// Create security log for defender
	securityLog := models.SecurityLog{
		UserID:    defenderUUID,
		LogType:   "attack",
		Message:   func() string {
			if attackSuccess {
				return "Successful attack on your system"
			}
			return "Failed attack on your system"
		}(),
		Severity:  func() string {
			if attackSuccess {
				return "high"
			}
			return "medium"
		}(),
		IsResolved: false,
	}
	

	if err := tx.Create(&securityLog).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create security log"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":          "Attack completed",
		"success":          attackSuccess,
		"crypto_stolen":    cryptoStolen,
		"reputation_change": reputationChange,
	})
}

// GetPvPAttackHistory returns the PvP attack history for the current user
func GetPvPAttackHistory(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get attack history
	var attacks []models.PvPAttack
	if err := database.DB.Preload("Defender").Where("attacker_id = ?", userUUID).Order("attack_timestamp DESC").Find(&attacks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get attack history"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"attacks": attacks})
}

// GetPvPDefenseHistory returns the PvP defense history for the current user
func GetPvPDefenseHistory(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get defense history
	var defenses []models.PvPAttack
	if err := database.DB.Preload("Attacker").Where("defender_id = ?", userUUID).Order("attack_timestamp DESC").Find(&defenses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get defense history"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"defenses": defenses})
}

// GetAttackCooldown returns the current attack cooldown status
func GetAttackCooldown(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Check if user is on cooldown
	var recentAttack models.PvPAttack
	cooldownTime := time.Now().Add(-60 * time.Second) // 60 second cooldown
	result := database.DB.Where("attacker_id = ? AND attack_timestamp > ?", userUUID, cooldownTime).Order("attack_timestamp DESC").First(&recentAttack)
	
	if result.Error != nil {
		// No recent attack, no cooldown
		c.JSON(http.StatusOK, gin.H{
			"on_cooldown": false,
			"cooldown_seconds": 0,
		})
		return
	}

	// Calculate remaining cooldown
	cooldownEnd := recentAttack.AttackTimestamp.Add(60 * time.Second)
	remainingSeconds := int(cooldownEnd.Sub(time.Now()).Seconds())
	
	if remainingSeconds <= 0 {
		c.JSON(http.StatusOK, gin.H{
			"on_cooldown": false,
			"cooldown_seconds": 0,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"on_cooldown": true,
		"cooldown_seconds": remainingSeconds,
	})
}