package handlers

import (
	"net/http"
	"time"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetMissions returns all available missions
func GetMissions(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get user stats to check level
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Get all active missions that match the user's level
	var missions []models.Mission
	if err := database.DB.Where("is_active = ? AND min_level <= ?", true, userStats.Level).Find(&missions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get missions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"missions": missions})
}

// GetMission returns details of a specific mission
func GetMission(c *gin.Context) {
	// Get mission ID from URL
	missionID := c.Param("id")
	if missionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mission ID is required"})
		return
	}

	// Parse UUID
	missionUUID, err := uuid.Parse(missionID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid mission ID"})
		return
	}

	// Get mission from database
	var mission models.Mission
	if err := database.DB.First(&mission, "id = ?", missionUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mission not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mission": mission})
}

// StartMission starts a mission for the current user
func StartMission(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get mission ID from URL
	missionID := c.Param("id")
	if missionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mission ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	missionUUID, err := uuid.Parse(missionID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid mission ID"})
		return
	}

	// Check if user already has an active mission
	var activeMission models.UserMission
	result := database.DB.Where("user_id = ? AND status = ?", userUUID, "In Progress").First(&activeMission)
	if result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "You already have an active mission"})
		return
	}

	// Get mission details
	var mission models.Mission
	if err := database.DB.First(&mission, "id = ?", missionUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mission not found"})
		return
	}

	// Check if mission is active
	if !mission.IsActive {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mission is not available"})
		return
	}

	// Check if user meets level requirement
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	if userStats.Level < mission.MinLevel {
		c.JSON(http.StatusForbidden, gin.H{"error": "User level too low for this mission"})
		return
	}

	// Create user mission
	userMission := models.UserMission{
		UserID:    userUUID,
		MissionID: missionUUID,
		Status:    "In Progress",
		StartedAt: time.Now(),
	}

	if err := database.DB.Create(&userMission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start mission"})
		return
	}

	// Return mission details
	c.JSON(http.StatusOK, gin.H{
		"message": "Mission started successfully",
		"mission": mission,
		"user_mission": userMission,
	})
}

// CompleteMission completes a mission for the current user
func CompleteMission(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get mission ID from URL
	missionID := c.Param("id")
	if missionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mission ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	missionUUID, err := uuid.Parse(missionID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid mission ID"})
		return
	}

	// Get user mission
	var userMission models.UserMission
	if err := database.DB.Where("user_id = ? AND mission_id = ? AND status = ?", userUUID, missionUUID, "In Progress").First(&userMission).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Active mission not found"})
		return
	}

	// Get mission details
	var mission models.Mission
	if err := database.DB.First(&mission, "id = ?", missionUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mission not found"})
		return
	}

	// Calculate success based on mission success rate
	success := true // For simplicity, always succeed in this example
	// In a real implementation, you would use mission.SuccessRate to determine success

	// Begin transaction
	tx := database.DB.Begin()

	// Update user mission
	now := time.Now()
	userMission.CompletedAt = &now
	
	// Set reward and experience based on success
	if success {
		userMission.Status = "Completed"
		reward := mission.BaseReward
		experience := mission.BaseReward / 10
		userMission.RewardEarned = &reward
		userMission.ExperienceGained = &experience

		// Update user stats
		if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Updates(map[string]interface{}{
			"crypto_balance":     database.DB.Raw("crypto_balance + ?", reward),
			"experience":         database.DB.Raw("experience + ?", experience),
			"missions_completed": database.DB.Raw("missions_completed + 1"),
		}).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user stats"})
			return
		}

		// Create transaction record
		transaction := models.Transaction{
			UserID:          userUUID,
			Amount:          reward,
			TransactionType: "Mission Reward",
			Description:     "Reward for completing mission: " + mission.Title,
			ReferenceID:     &userMission.ID,
			ReferenceType:   "Mission",
		}

		if err := tx.Create(&transaction).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
			return
		}

		// Create notification
		notification := models.Notification{
			UserID:           userUUID,
			Title:            "Mission Completed",
			Message:          "You have successfully completed the mission: " + mission.Title,
			NotificationType: "Mission",
		}

		if err := tx.Create(&notification).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification"})
			return
		}
	} else {
		userMission.Status = "Failed"
		
		// Update user stats
		if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Updates(map[string]interface{}{
			"missions_failed": database.DB.Raw("missions_failed + 1"),
		}).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user stats"})
			return
		}

		// Create notification
		notification := models.Notification{
			UserID:           userUUID,
			Title:            "Mission Failed",
			Message:          "You have failed the mission: " + mission.Title,
			NotificationType: "Mission",
		}

		if err := tx.Create(&notification).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification"})
			return
		}
	}

	// Save user mission
	if err := tx.Save(&userMission).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update mission"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mission completed successfully",
		"success": success,
		"reward":  userMission.RewardEarned,
	})
}

// AbortMission aborts a mission for the current user
func AbortMission(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get mission ID from URL
	missionID := c.Param("id")
	if missionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mission ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	missionUUID, err := uuid.Parse(missionID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid mission ID"})
		return
	}

	// Get user mission
	var userMission models.UserMission
	if err := database.DB.Where("user_id = ? AND mission_id = ? AND status = ?", userUUID, missionUUID, "In Progress").First(&userMission).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Active mission not found"})
		return
	}

	// Update user mission
	now := time.Now()
	userMission.CompletedAt = &now
	userMission.Status = "Aborted"

	if err := database.DB.Save(&userMission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to abort mission"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Mission aborted successfully"})
}

// GetMissionHistory returns the mission history for the current user
func GetMissionHistory(c *gin.Context) {
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

	// Get user missions with mission details
	var userMissions []models.UserMission
	if err := database.DB.Preload("Mission").Where("user_id = ?", userUUID).Order("started_at DESC").Find(&userMissions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get mission history"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"missions": userMissions})
}

// GetActiveMission returns the active mission for the current user
func GetActiveMission(c *gin.Context) {
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

	// Get active mission
	var userMission models.UserMission
	result := database.DB.Preload("Mission").Where("user_id = ? AND status = ?", userUUID, "In Progress").First(&userMission)
	if result.Error != nil {
		c.JSON(http.StatusOK, gin.H{"active_mission": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"active_mission": userMission})
}