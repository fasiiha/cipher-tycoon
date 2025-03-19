package handlers

import (
	"net/http"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// CreateUpgradeRequest represents the request body for creating an upgrade
type CreateUpgradeRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
	Category    string `json:"category" binding:"required"`
	BaseCost    int    `json:"base_cost" binding:"required"`
	MaxLevel    int    `json:"max_level" binding:"required"`
}

// UpdateUpgradeRequest represents the request body for updating an upgrade
type UpdateUpgradeRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Category    string `json:"category"`
	BaseCost    int    `json:"base_cost"`
	MaxLevel    int    `json:"max_level"`
}

// CreateUpgradeEffectRequest represents the request body for creating an upgrade effect
type CreateUpgradeEffectRequest struct {
	Level       int    `json:"level" binding:"required"`
	EffectType  string `json:"effect_type" binding:"required"`
	EffectValue int    `json:"effect_value" binding:"required"`
}

// UpdateUpgradeEffectRequest represents the request body for updating an upgrade effect
type UpdateUpgradeEffectRequest struct {
	Level       int    `json:"level"`
	EffectType  string `json:"effect_type"`
	EffectValue int    `json:"effect_value"`
}

// CreateUpgrade creates a new upgrade
func CreateUpgrade(c *gin.Context) {
	var req CreateUpgradeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create upgrade
	upgrade := models.Upgrade{
		Name:        req.Name,
		Description: req.Description,
		Category:    req.Category,
		BaseCost:    req.BaseCost,
		MaxLevel:    req.MaxLevel,
	}

	if err := database.DB.Create(&upgrade).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upgrade"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Upgrade created successfully",
		"upgrade": upgrade,
	})
}

// UpdateUpgrade updates an existing upgrade
func UpdateUpgrade(c *gin.Context) {
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

	var req UpdateUpgradeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get upgrade from database
	var upgrade models.Upgrade
	if err := database.DB.First(&upgrade, "id = ?", upgradeUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Upgrade not found"})
		return
	}

	// Update upgrade fields if provided
	if req.Name != "" {
		upgrade.Name = req.Name
	}
	if req.Description != "" {
		upgrade.Description = req.Description
	}
	if req.Category != "" {
		upgrade.Category = req.Category
	}
	if req.BaseCost != 0 {
		upgrade.BaseCost = req.BaseCost
	}
	if req.MaxLevel != 0 {
		upgrade.MaxLevel = req.MaxLevel
	}

	// Save changes
	if err := database.DB.Save(&upgrade).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update upgrade"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Upgrade updated successfully",
		"upgrade": upgrade,
	})
}

// DeleteUpgrade deletes an upgrade
func DeleteUpgrade(c *gin.Context) {
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

	// Check if upgrade exists
	var upgrade models.Upgrade
	if err := database.DB.First(&upgrade, "id = ?", upgradeUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Upgrade not found"})
		return
	}

	// Delete upgrade
	if err := database.DB.Delete(&upgrade).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete upgrade"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Upgrade deleted successfully"})
}

// AddUpgradeEffect adds an effect to an upgrade
func AddUpgradeEffect(c *gin.Context) {
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

	var req CreateUpgradeEffectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if upgrade exists
	var upgrade models.Upgrade
	if err := database.DB.First(&upgrade, "id = ?", upgradeUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Upgrade not found"})
		return
	}

	// Check if effect for this level already exists
	var existingEffect models.UpgradeEffect
	result := database.DB.Where("upgrade_id = ? AND level = ?", upgradeUUID, req.Level).First(&existingEffect)
	if result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Effect for this level already exists"})
		return
	}

	// Create upgrade effect
	effect := models.UpgradeEffect{
		UpgradeID:   upgradeUUID,
		Level:       req.Level,
		EffectType:  req.EffectType,
		EffectValue: req.EffectValue,
	}

	if err := database.DB.Create(&effect).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upgrade effect"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Upgrade effect created successfully",
		"effect":  effect,
	})
}

// UpdateUpgradeEffect updates an existing upgrade effect
func UpdateUpgradeEffect(c *gin.Context) {
	// Get upgrade ID and effect ID from URL
	upgradeID := c.Param("id")
	effectID := c.Param("effectId")
	if upgradeID == "" || effectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Upgrade ID and Effect ID are required"})
		return
	}

	// Parse UUIDs
	upgradeUUID, err := uuid.Parse(upgradeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid upgrade ID"})
		return
	}

	effectUUID, err := uuid.Parse(effectID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid effect ID"})
		return
	}

	var req UpdateUpgradeEffectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get upgrade effect from database
	var effect models.UpgradeEffect
	if err := database.DB.Where("id = ? AND upgrade_id = ?", effectUUID, upgradeUUID).First(&effect).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Upgrade effect not found"})
		return
	}

	// Update effect fields if provided
	if req.Level != 0 {
		effect.Level = req.Level
	}
	if req.EffectType != "" {
		effect.EffectType = req.EffectType
	}
	if req.EffectValue != 0 {
		effect.EffectValue = req.EffectValue
	}

	// Save changes
	if err := database.DB.Save(&effect).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update upgrade effect"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Upgrade effect updated successfully",
		"effect":  effect,
	})
}

// DeleteUpgradeEffect deletes an upgrade effect
func DeleteUpgradeEffect(c *gin.Context) {
	// Get upgrade ID and effect ID from URL
	upgradeID := c.Param("id")
	effectID := c.Param("effectId")
	if upgradeID == "" || effectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Upgrade ID and Effect ID are required"})
		return
	}

	// Parse UUIDs
	upgradeUUID, err := uuid.Parse(upgradeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid upgrade ID"})
		return
	}

	effectUUID, err := uuid.Parse(effectID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid effect ID"})
		return
	}

	// Check if effect exists
	var effect models.UpgradeEffect
	if err := database.DB.Where("id = ? AND upgrade_id = ?", effectUUID, upgradeUUID).First(&effect).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Upgrade effect not found"})
		return
	}

	// Delete effect
	if err := database.DB.Delete(&effect).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete upgrade effect"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Upgrade effect deleted successfully"})
}