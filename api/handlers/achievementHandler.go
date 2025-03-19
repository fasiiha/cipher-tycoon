package handlers

import (
	"net/http"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetAchievements returns all achievements
func GetAchievements(c *gin.Context) {
	var achievements []models.Achievement
	if err := database.DB.Find(&achievements).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get achievements"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"achievements": achievements})
}

// GetAchievement returns details of a specific achievement
func GetAchievement(c *gin.Context) {
	// Get achievement ID from URL
	achievementID := c.Param("id")
	if achievementID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Achievement ID is required"})
		return
	}

	// Parse UUID
	achievementUUID, err := uuid.Parse(achievementID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid achievement ID"})
		return
	}

	// Get achievement
	var achievement models.Achievement
	if err := database.DB.First(&achievement, "id = ?", achievementUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Achievement not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"achievement": achievement})
}

// GetUserAchievements returns achievements for the current user
func GetUserAchievements(c *gin.Context) {
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

	// Get user achievements with achievement details
	var userAchievements []models.UserAchievement
	if err := database.DB.Preload("Achievement").Where("user_id = ?", userUUID).Find(&userAchievements).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user achievements"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"achievements": userAchievements})
}

// CreateAchievementRequest represents the request body for creating an achievement
type CreateAchievementRequest struct {
	Title        string `json:"title" binding:"required"`
	Description  string `json:"description" binding:"required"`
	Requirement  string `json:"requirement" binding:"required"`
	RewardAmount int    `json:"reward_amount" binding:"required"`
}

// UpdateAchievementRequest represents the request body for updating an achievement
type UpdateAchievementRequest struct {
	Title        string `json:"title"`
	Description  string `json:"description"`
	Requirement  string `json:"requirement"`
	RewardAmount int    `json:"reward_amount"`
}

// CreateAchievement creates a new achievement
func CreateAchievement(c *gin.Context) {
	var req CreateAchievementRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create achievement
	achievement := models.Achievement{
		Title:        req.Title,
		Description:  req.Description,
		Requirement:  req.Requirement,
		RewardAmount: req.RewardAmount,
	}

	if err := database.DB.Create(&achievement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create achievement"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":     "Achievement created successfully",
		"achievement": achievement,
	})
}

// UpdateAchievement updates an existing achievement
func UpdateAchievement(c *gin.Context) {
	// Get achievement ID from URL
	achievementID := c.Param("id")
	if achievementID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Achievement ID is required"})
		return
	}

	// Parse UUID
	achievementUUID, err := uuid.Parse(achievementID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid achievement ID"})
		return
	}

	var req UpdateAchievementRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get achievement from database
	var achievement models.Achievement
	if err := database.DB.First(&achievement, "id = ?", achievementUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Achievement not found"})
		return
	}

	// Update achievement fields if provided
	if req.Title != "" {
		achievement.Title = req.Title
	}
	if req.Description != "" {
		achievement.Description = req.Description
	}
	if req.Requirement != "" {
		achievement.Requirement = req.Requirement
	}
	if req.RewardAmount != 0 {
		achievement.RewardAmount = req.RewardAmount
	}

	// Save changes
	if err := database.DB.Save(&achievement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update achievement"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Achievement updated successfully",
		"achievement": achievement,
	})
}

// DeleteAchievement deletes an achievement
func DeleteAchievement(c *gin.Context) {
	// Get achievement ID from URL
	achievementID := c.Param("id")
	if achievementID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Achievement ID is required"})
		return
	}

	// Parse UUID
	achievementUUID, err := uuid.Parse(achievementID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid achievement ID"})
		return
	}

	// Check if achievement exists
	var achievement models.Achievement
	if err := database.DB.First(&achievement, "id = ?", achievementUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Achievement not found"})
		return
	}

	// Delete achievement
	if err := database.DB.Delete(&achievement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete achievement"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Achievement deleted successfully"})
}