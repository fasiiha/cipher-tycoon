package handlers

import (
	"net/http"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// CreateMissionRequest represents the request body for creating a mission
type CreateMissionRequest struct {
	Title        string `json:"title" binding:"required"`
	Description  string `json:"description" binding:"required"`
	Difficulty   string `json:"difficulty" binding:"required"`
	Type         string `json:"type" binding:"required"`
	BaseReward   int    `json:"base_reward" binding:"required"`
	TimeRequired int    `json:"time_required" binding:"required"`
	MinLevel     int    `json:"min_level" binding:"required"`
	SuccessRate  int    `json:"success_rate" binding:"required"`
	IsActive     bool   `json:"is_active"`
}

// UpdateMissionRequest represents the request body for updating a mission
type UpdateMissionRequest struct {
	Title        string `json:"title"`
	Description  string `json:"description"`
	Difficulty   string `json:"difficulty"`
	Type         string `json:"type"`
	BaseReward   int    `json:"base_reward"`
	TimeRequired int    `json:"time_required"`
	MinLevel     int    `json:"min_level"`
	SuccessRate  int    `json:"success_rate"`
	IsActive     *bool  `json:"is_active"`
}

// CreateMission creates a new mission
func CreateMission(c *gin.Context) {
	var req CreateMissionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create mission
	mission := models.Mission{
		Title:        req.Title,
		Description:  req.Description,
		Difficulty:   req.Difficulty,
		Type:         req.Type,
		BaseReward:   req.BaseReward,
		TimeRequired: req.TimeRequired,
		MinLevel:     req.MinLevel,
		SuccessRate:  req.SuccessRate,
		IsActive:     req.IsActive,
	}

	if err := database.DB.Create(&mission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create mission"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Mission created successfully",
		"mission": mission,
	})
}

// UpdateMission updates an existing mission
func UpdateMission(c *gin.Context) {
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

	var req UpdateMissionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get mission from database
	var mission models.Mission
	if err := database.DB.First(&mission, "id = ?", missionUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mission not found"})
		return
	}

	// Update mission fields if provided
	if req.Title != "" {
		mission.Title = req.Title
	}
	if req.Description != "" {
		mission.Description = req.Description
	}
	if req.Difficulty != "" {
		mission.Difficulty = req.Difficulty
	}
	if req.Type != "" {
		mission.Type = req.Type
	}
	if req.BaseReward != 0 {
		mission.BaseReward = req.BaseReward
	}
	if req.TimeRequired != 0 {
		mission.TimeRequired = req.TimeRequired
	}
	if req.MinLevel != 0 {
		mission.MinLevel = req.MinLevel
	}
	if req.SuccessRate != 0 {
		mission.SuccessRate = req.SuccessRate
	}
	if req.IsActive != nil {
		mission.IsActive = *req.IsActive
	}

	// Save changes
	if err := database.DB.Save(&mission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update mission"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mission updated successfully",
		"mission": mission,
	})
}

// DeleteMission deletes a mission
func DeleteMission(c *gin.Context) {
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

	// Check if mission exists
	var mission models.Mission
	if err := database.DB.First(&mission, "id = ?", missionUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mission not found"})
		return
	}

	// Delete mission
	if err := database.DB.Delete(&mission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete mission"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Mission deleted successfully"})
}