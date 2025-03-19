package handlers

import (
	"net/http"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetAllUsers returns all users
func GetAllUsers(c *gin.Context) {
	var users []models.User
	if err := database.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get users"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"users": users})
}

// GetUserByID returns a user by ID
func GetUserByID(c *gin.Context) {
	// Get user ID from URL
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get user
	var user models.User
	if err := database.DB.Preload("Stats").First(&user, "id = ?", userUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}

// UpdateUserRequest represents the request body for updating a user
type UpdateUserRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	IsActive bool   `json:"is_active"`
}

// UpdateUser updates a user
func UpdateUser(c *gin.Context) {
	// Get user ID from URL
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Parse request body
	var req UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user
	var user models.User
	if err := database.DB.First(&user, "id = ?", userUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Update user fields if provided
	updates := make(map[string]interface{})
	
	if req.Username != "" {
		updates["username"] = req.Username
	}
	
	if req.Email != "" {
		updates["email"] = req.Email
	}
	
	updates["is_active"] = req.IsActive

	// Update user
	if err := database.DB.Model(&user).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User updated successfully",
		"user":    user,
	})
}

// DeleteUser deletes a user
func DeleteUser(c *gin.Context) {
	// Get user ID from URL
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Delete user's data
	if err := tx.Where("user_id = ?", userUUID).Delete(&models.UserStats{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user stats"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.UserUpgrade{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user upgrades"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.UserSecuritySystem{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user security systems"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.UserMission{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user missions"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.Vulnerability{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete vulnerabilities"})
		return
	}

	if err := tx.Where("attacker_id = ? OR defender_id = ?", userUUID, userUUID).Delete(&models.PvPAttack{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete PvP attacks"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.SecurityLog{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete security logs"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.Transaction{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete transactions"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.Notification{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete notifications"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.NotificationSettings{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete notification settings"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.UserAchievement{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user achievements"})
		return
	}

	if err := tx.Where("user_id = ?", userUUID).Delete(&models.Session{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete sessions"})
		return
	}

	// Finally, delete the user
	if err := tx.Delete(&models.User{}, userUUID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// MakeUserAdmin makes a user an admin
func MakeUserAdmin(c *gin.Context) {
	// Get user ID from URL
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get user
	var user models.User
	if err := database.DB.First(&user, "id = ?", userUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check if user is already an admin
	if user.IsAdmin {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User is already an admin"})
		return
	}

	// Update user
	if err := database.DB.Model(&user).Update("is_admin", true).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to make user admin"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User is now an admin",
		"user":    user,
	})
}

// RemoveUserAdmin removes admin privileges from a user
func RemoveUserAdmin(c *gin.Context) {
	// Get user ID from URL
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get user
	var user models.User
	if err := database.DB.First(&user, "id = ?", userUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check if user is not an admin
	if !user.IsAdmin {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User is not an admin"})
		return
	}

	// Update user
	if err := database.DB.Model(&user).Update("is_admin", false).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove admin privileges"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Admin privileges removed from user",
		"user":    user,
	})
}

// GetAdminStats returns admin statistics
func GetAdminStats(c *gin.Context) {
	// Get total users
	var totalUsers int64
	if err := database.DB.Model(&models.User{}).Count(&totalUsers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count users"})
		return
	}

	// Get active users
	var activeUsers int64
	if err := database.DB.Model(&models.User{}).Where("is_active = ?", true).Count(&activeUsers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count active users"})
		return
	}

	// Get total missions
	var totalMissions int64
	if err := database.DB.Model(&models.Mission{}).Count(&totalMissions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count missions"})
		return
	}

	// Get total upgrades
	var totalUpgrades int64
	if err := database.DB.Model(&models.Upgrade{}).Count(&totalUpgrades).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count upgrades"})
		return
	}

	// Get total security systems
	var totalSecuritySystems int64
	if err := database.DB.Model(&models.SecuritySystem{}).Count(&totalSecuritySystems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count security systems"})
		return
	}

	// Get total achievements
	var totalAchievements int64
	if err := database.DB.Model(&models.Achievement{}).Count(&totalAchievements).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count achievements"})
		return
	}

	// Get total PvP attacks
	var totalPvPAttacks int64
	if err := database.DB.Model(&models.PvPAttack{}).Count(&totalPvPAttacks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count PvP attacks"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"total_users":           totalUsers,
		"active_users":          activeUsers,
		"total_missions":        totalMissions,
		"total_upgrades":        totalUpgrades,
		"total_security_systems": totalSecuritySystems,
		"total_achievements":    totalAchievements,
		"total_pvp_attacks":     totalPvPAttacks,
	})
}