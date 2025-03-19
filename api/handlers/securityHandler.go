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

// GetSecuritySystems returns all available security systems
func GetSecuritySystems(c *gin.Context) {
	var systems []models.SecuritySystem
	if err := database.DB.Find(&systems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get security systems"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"systems": systems})
}

// GetSecuritySystem returns details of a specific security system
func GetSecuritySystem(c *gin.Context) {
	// Get system ID from URL
	systemID := c.Param("id")
	if systemID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Security system ID is required"})
		return
	}

	// Parse UUID
	systemUUID, err := uuid.Parse(systemID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid security system ID"})
		return
	}

	// Get system from database
	var system models.SecuritySystem
	if err := database.DB.First(&system, "id = ?", systemUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Security system not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"system": system})
}

// PurchaseSecuritySystem purchases a security system for the current user
func PurchaseSecuritySystem(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get system ID from URL
	systemID := c.Param("id")
	if systemID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Security system ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	systemUUID, err := uuid.Parse(systemID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid security system ID"})
		return
	}

	// Check if user already has this security system
	var existingSystem models.UserSecuritySystem
	result := database.DB.Where("user_id = ? AND security_system_id = ?", userUUID, systemUUID).First(&existingSystem)
	if result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "You already own this security system"})
		return
	}

	// Get security system details
	var system models.SecuritySystem
	if err := database.DB.First(&system, "id = ?", systemUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Security system not found"})
		return
	}

	// Get user stats to check balance
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Check if user has enough crypto
	if userStats.CryptoBalance < system.BaseCost {
		c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient funds"})
		return
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Create user security system
	userSystem := models.UserSecuritySystem{
		UserID:           userUUID,
		SecuritySystemID: systemUUID,
		Level:            1,
		Status:           "active",
		Effectiveness:    50, // Default effectiveness
		PurchasedAt:      time.Now(),
		LastUpgradedAt:   time.Now(),
	}

	if err := tx.Create(&userSystem).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to purchase security system"})
		return
	}

	// Update user stats
	if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Update("crypto_balance", userStats.CryptoBalance-system.BaseCost).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user stats"})
		return
	}

	// Create transaction record
	transaction := models.Transaction{
		UserID:          userUUID,
		Amount:          -system.BaseCost,
		TransactionType: "Security Purchase",
		Description:     "Purchase of security system: " + system.Name,
		ReferenceID:     &userSystem.ID,
		ReferenceType:   "SecuritySystem",
	}

	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Security System Purchased",
		Message:          "You have purchased the security system: " + system.Name,
		NotificationType: "Security",
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
		"message":      "Security system purchased successfully",
		"user_system":  userSystem,
	})
}

// UpgradeSecuritySystem upgrades the level of an existing security system
func UpgradeSecuritySystem(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get system ID from URL
	systemID := c.Param("id")
	if systemID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Security system ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	systemUUID, err := uuid.Parse(systemID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid security system ID"})
		return
	}

	// Get user security system
	var userSystem models.UserSecuritySystem
	if err := database.DB.Where("user_id = ? AND security_system_id = ?", userUUID, systemUUID).First(&userSystem).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "You don't own this security system"})
		return
	}

	// Get security system details
	var system models.SecuritySystem
	if err := database.DB.First(&system, "id = ?", systemUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Security system not found"})
		return
	}

	// Check if system is already at max level
	if userSystem.Level >= system.MaxLevel {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Security system already at maximum level"})
		return
	}

	// Calculate upgrade cost
	upgradeCost := system.BaseCost * (userSystem.Level + 1)

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

	// Update user security system
	userSystem.Level++
	userSystem.LastUpgradedAt = time.Now()
	userSystem.Effectiveness += 10 // Increase effectiveness with each level

	if err := tx.Save(&userSystem).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upgrade security system"})
		return
	}

	// Update user stats
	if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Update("crypto_balance", userStats.CryptoBalance-upgradeCost).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user stats"})
		return
	}

	// Create transaction record
	transaction := models.Transaction{
		UserID:          userUUID,
		Amount:          -upgradeCost,
		TransactionType: "Security Upgrade",
		Description:     "Upgrade of security system: " + system.Name + " to level " + string(rune(userSystem.Level)),
		ReferenceID:     &userSystem.ID,
		ReferenceType:   "SecuritySystem",
	}

	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Security System Upgraded",
		Message:          "You have upgraded the security system: " + system.Name + " to level " + string(rune(userSystem.Level)),
		NotificationType: "Security",
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
		"message":      "Security system upgraded successfully",
		"user_system":  userSystem,
	})
}

// GetUserSecuritySystems returns all security systems owned by the current user
func GetUserSecuritySystems(c *gin.Context) {
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

	// Get user security systems with system details
	var userSystems []models.UserSecuritySystem
	if err := database.DB.Preload("SecuritySystem").Where("user_id = ?", userUUID).Find(&userSystems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user security systems"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"systems": userSystems})
}

// GetVulnerabilities returns all vulnerabilities for the current user
func GetVulnerabilities(c *gin.Context) {
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

	// Get vulnerabilities
	var vulnerabilities []models.Vulnerability
	if err := database.DB.Where("user_id = ?", userUUID).Find(&vulnerabilities).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get vulnerabilities"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"vulnerabilities": vulnerabilities})
}

// FixVulnerability fixes a vulnerability for the current user
func FixVulnerability(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get vulnerability ID from URL
	vulnID := c.Param("id")
	if vulnID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Vulnerability ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	vulnUUID, err := uuid.Parse(vulnID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid vulnerability ID"})
		return
	}

	// Get vulnerability
	var vulnerability models.Vulnerability
	if err := database.DB.Where("id = ? AND user_id = ?", vulnUUID, userUUID).First(&vulnerability).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vulnerability not found"})
		return
	}

	// Check if vulnerability is already fixed
	if vulnerability.Status == "resolved" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Vulnerability is already fixed"})
		return
	}

	// Get user stats to check balance
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Check if user has enough crypto
	if userStats.CryptoBalance < vulnerability.FixCost {
		c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient funds"})
		return
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Update vulnerability
	now := time.Now()
	vulnerability.Status = "resolved"
	vulnerability.ResolvedAt = &now

	if err := tx.Save(&vulnerability).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fix vulnerability"})
		return
	}

	// Update user stats
	if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Update("crypto_balance", userStats.CryptoBalance-vulnerability.FixCost).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user stats"})
		return
	}

	// Create transaction record
	transaction := models.Transaction{
		UserID:          userUUID,
		Amount:          -vulnerability.FixCost,
		TransactionType: "Vulnerability Fix",
		Description:     "Fixed vulnerability: " + vulnerability.Name,
		ReferenceID:     &vulnerability.ID,
		ReferenceType:   "Vulnerability",
	}

	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Vulnerability Fixed",
		Message:          "You have fixed the vulnerability: " + vulnerability.Name,
		NotificationType: "Security",
	}

	if err := tx.Create(&notification).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification"})
		return
	}

	// Update security level based on risk
	// securityIncrease := 0
	// if vulnerability.Risk == "high" {
	// 	securityIncrease = 10
	// } else if vulnerability.Risk == "medium" {
	// 	securityIncrease = 5
	// } else {
	// 	securityIncrease = 2
	// }

	// Create security log
	securityLog := models.SecurityLog{
		UserID:     userUUID,
		LogType:    "vulnerability",
		Message:    "Vulnerability fixed: " + vulnerability.Name,
		Severity:   vulnerability.Risk,
		IsResolved: true,
		ResolvedAt: &now,
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
		"message":       "Vulnerability fixed successfully",
		"vulnerability": vulnerability,
	})
}

// ScanForVulnerabilities scans for vulnerabilities for the current user
func ScanForVulnerabilities(c *gin.Context) {
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

	// Generate random vulnerabilities
	rand.Seed(time.Now().UnixNano())
	numVulnerabilities := rand.Intn(3) + 1 // 1-3 vulnerabilities

	vulnerabilities := []models.Vulnerability{}
	
	// Potential vulnerabilities
	potentialVulns := []struct {
		Name        string
		Description string
		Risk        string
		FixCost     int
	}{
		{
			Name:        "Outdated Authentication Protocol",
			Description: "Your authentication system is using an outdated protocol that could be exploited.",
			Risk:        "high",
			FixCost:     350,
		},
		{
			Name:        "Weak Encryption on Database",
			Description: "Your database is using weak encryption that could be compromised.",
			Risk:        "medium",
			FixCost:     250,
		},
		{
			Name:        "Open Port 8080",
			Description: "Port 8080 is open and could be used to gain unauthorized access.",
			Risk:        "low",
			FixCost:     150,
		},
		{
			Name:        "SQL Injection Vulnerability",
			Description: "Your system is vulnerable to SQL injection attacks.",
			Risk:        "high",
			FixCost:     400,
		},
		{
			Name:        "Cross-Site Scripting (XSS) Vulnerability",
			Description: "Your web interface is vulnerable to XSS attacks.",
			Risk:        "medium",
			FixCost:     300,
		},
		{
			Name:        "Insecure Direct Object References",
			Description: "Your system has insecure direct object references that could be exploited.",
			Risk:        "medium",
			FixCost:     275,
		},
		{
			Name:        "Missing Security Headers",
			Description: "Your web server is missing important security headers.",
			Risk:        "low",
			FixCost:     125,
		},
	}

	// Shuffle potential vulnerabilities
	rand.Shuffle(len(potentialVulns), func(i, j int) {
		potentialVulns[i], potentialVulns[j] = potentialVulns[j], potentialVulns[i]
	})

	// Begin transaction
	tx := database.DB.Begin()

	// Create vulnerabilities
	for i := 0; i < numVulnerabilities && i < len(potentialVulns); i++ {
		vuln := models.Vulnerability{
			UserID:      userUUID,
			Name:        potentialVulns[i].Name,
			Description: potentialVulns[i].Description,
			Risk:        potentialVulns[i].Risk,
			Status:      "unresolved",
			FixCost:     potentialVulns[i].FixCost,
			DetectedAt:  time.Now(),
		}

		if err := tx.Create(&vuln).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create vulnerability"})
			return
		}

		vulnerabilities = append(vulnerabilities, vuln)

		// Create security log
		securityLog := models.SecurityLog{
			UserID:    userUUID,
			LogType:   "scan",
			Message:   "Vulnerability detected: " + vuln.Name,
			Severity:  vuln.Risk,
			IsResolved: false,
		}

		if err := tx.Create(&securityLog).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create security log"})
			return
		}
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Security Scan Completed",
		Message:          "Security scan completed. " + string(rune(numVulnerabilities)) + " vulnerabilities found.",
		NotificationType: "Security",
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
		"message":        "Security scan completed successfully",
		"vulnerabilities": vulnerabilities,
	})
}

// GetSecurityLogs returns security logs for the current user
func GetSecurityLogs(c *gin.Context) {
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

	// Get security logs
	var logs []models.SecurityLog
	if err := database.DB.Where("user_id = ?", userUUID).Order("created_at DESC").Find(&logs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get security logs"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"logs": logs})
}

// ResolveSecurityLog marks a security log as resolved
func ResolveSecurityLog(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get log ID from URL
	logID := c.Param("id")
	if logID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Log ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	logUUID, err := uuid.Parse(logID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid log ID"})
		return
	}

	// Get security log
	var log models.SecurityLog
	if err := database.DB.Where("id = ? AND user_id = ?", logUUID, userUUID).First(&log).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Security log not found"})
		return
	}

	// Check if log is already resolved
	if log.IsResolved {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Security log is already resolved"})
		return
	}

	// Update log
	if log.IsResolved {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Security log is already resolved"})
		return
	}

	// Update log
	now := time.Now()
	log.IsResolved = true
	log.ResolvedAt = &now

	if err := database.DB.Save(&log).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve security log"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Security log resolved successfully",
		"log":     log,
	})
}