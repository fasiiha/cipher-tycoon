package handlers

import (
	"net/http"
	"time"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetUpgrades returns all available upgrades
func GetUpgrades(c *gin.Context) {
	var upgrades []models.Upgrade
	if err := database.DB.Preload("Effects").Find(&upgrades).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get upgrades"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"upgrades": upgrades})
}

// GetUpgrade returns details of a specific upgrade
func GetUpgrade(c *gin.Context) {
	// Get upgrade ID from URL
	upgradeID := c.Param("id")
	if upgradeID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Upgrade ID is required"})
		return
	}

	// Parse UUID
	upgradeUUID, err := uuid.Parse(upgradeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid upgrade ID"})
		return
	}

	// Get upgrade from database
	var upgrade models.Upgrade
	if err := database.DB.Preload("Effects").First(&upgrade, "id = ?", upgradeUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Upgrade not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"upgrade": upgrade})
}

// PurchaseUpgrade purchases an upgrade for the current user
func PurchaseUpgrade(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get upgrade ID from URL
	upgradeID := c.Param("id")
	if upgradeID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Upgrade ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	upgradeUUID, err := uuid.Parse(upgradeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid upgrade ID"})
		return
	}

	// Check if user already has this upgrade
	var existingUpgrade models.UserUpgrade
	result := database.DB.Where("user_id = ? AND upgrade_id = ?", userUUID, upgradeUUID).First(&existingUpgrade)
	if result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "You already own this upgrade"})
		return
	}

	// Get upgrade details
	var upgrade models.Upgrade
	if err := database.DB.First(&upgrade, "id = ?", upgradeUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Upgrade not found"})
		return
	}

	// Get user stats to check balance
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Check if user has enough crypto
	if userStats.CryptoBalance < upgrade.BaseCost {
		c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient funds"})
		return
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Create user upgrade
	userUpgrade := models.UserUpgrade{
		UserID:         userUUID,
		UpgradeID:      upgradeUUID,
		Level:          1,
		PurchasedAt:    time.Now(),
		LastUpgradedAt: time.Now(),
	}

	if err := tx.Create(&userUpgrade).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to purchase upgrade"})
		return
	}

	// Update user stats
	if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Updates(map[string]interface{}{
		"crypto_balance": userStats.CryptoBalance - upgrade.BaseCost,
		"total_upgrades": userStats.TotalUpgrades + 1,
	}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user stats"})
		return
	}

	// Create transaction record
	transaction := models.Transaction{
		UserID:          userUUID,
		Amount:          -upgrade.BaseCost,
		TransactionType: "Upgrade Purchase",
		Description:     "Purchase of upgrade: " + upgrade.Name,
		ReferenceID:     &userUpgrade.ID,
		ReferenceType:   "Upgrade",
	}

	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Upgrade Purchased",
		Message:          "You have purchased the upgrade: " + upgrade.Name,
		NotificationType: "Upgrade",
	}

	if err := tx.Create(&notification).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Upgrade purchased successfully",
		"user_upgrade": userUpgrade,
	})
}

// UpgradeLevel upgrades the level of an existing upgrade
func UpgradeLevel(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get upgrade ID from URL
	upgradeID := c.Param("id")
	if upgradeID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Upgrade ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	upgradeUUID, err := uuid.Parse(upgradeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid upgrade ID"})
		return
	}

	// Get user upgrade
	var userUpgrade models.UserUpgrade
	if err := database.DB.Where("user_id = ? AND upgrade_id = ?", userUUID, upgradeUUID).First(&userUpgrade).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "You don't own this upgrade"})
		return
	}

	// Get upgrade details
	var upgrade models.Upgrade
	if err := database.DB.First(&upgrade, "id = ?", upgradeUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Upgrade not found"})
		return
	}

	// Check if upgrade is already at max level
	if userUpgrade.Level >= upgrade.MaxLevel {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Upgrade already at maximum level"})
		return
	}

	// Calculate upgrade cost
	upgradeCost := upgrade.BaseCost * (userUpgrade.Level + 1)

	// Get user stats to check balance
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Check if user has enough crypto
	if userStats.CryptoBalance < upgradeCost {
		c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient funds"})
		return
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Update user upgrade
	userUpgrade.Level++
	userUpgrade.LastUpgradedAt = time.Now()

	if err := tx.Save(&userUpgrade).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upgrade"})
		return
	}

	// Update user stats
	if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Updates(map[string]interface{}{
		"crypto_balance": userStats.CryptoBalance - upgradeCost,
		"total_upgrades": userStats.TotalUpgrades + 1,
	}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user stats"})
		return
	}

	// Create transaction record
	transaction := models.Transaction{
		UserID:          userUUID,
		Amount:          -upgradeCost,
		TransactionType: "Upgrade Level",
		Description:     "Upgrade of " + upgrade.Name + " to level " + string(rune(userUpgrade.Level)),
		ReferenceID:     &userUpgrade.ID,
		ReferenceType:   "Upgrade",
	}

	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Upgrade Leveled Up",
		Message:          "You have upgraded " + upgrade.Name + " to level " + string(rune(userUpgrade.Level)),
		NotificationType: "Upgrade",
	}

	if err := tx.Create(&notification).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Upgrade level increased successfully",
		"user_upgrade": userUpgrade,
	})
}

// GetUserUpgrades returns all upgrades owned by the current user
func GetUserUpgrades(c *gin.Context) {
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

	// Get user upgrades with upgrade details
	var userUpgrades []models.UserUpgrade
	if err := database.DB.Preload("Upgrade.Effects").Where("user_id = ?", userUUID).Find(&userUpgrades).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user upgrades"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"upgrades": userUpgrades})
}