package handlers

import (
	"net/http"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// UserProfileUpdateRequest represents the request body for updating user profile
type UserProfileUpdateRequest struct {
	Username string `json:"username"`
	Bio      string `json:"bio"`
}

// UpdatePasswordRequest represents the request body for updating password
type UpdatePasswordRequest struct {
	CurrentPassword string `json:"current_password" binding:"required"`
	NewPassword     string `json:"new_password" binding:"required,min=8"`
}

// GetCurrentUser returns the current user's profile
func GetCurrentUser(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get user from database
	var user models.User
	if err := database.DB.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Return user data
	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":                user.ID,
			"username":          user.Username,
			"email":             user.Email,
			"avatar_url":        user.AvatarURL,
			"bio":               user.Bio,
			"created_at":        user.CreatedAt,
			"last_login":        user.LastLogin,
			"is_active":         user.IsActive,
			"is_admin":          user.IsAdmin,
			"two_factor_enabled": user.TwoFactorEnabled,
			"wallet_address":    user.WalletAddress,
		},
	})
}

// UpdateCurrentUser updates the current user's profile
func UpdateCurrentUser(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse request body
	var req UserProfileUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user from database
	var user models.User
	if err := database.DB.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Update user fields if provided
	if req.Username != "" && req.Username != user.Username {
		// Check if username is already taken
		var existingUser models.User
		if result := database.DB.Where("username = ? AND id != ?", req.Username, userID).First(&existingUser); result.Error == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
			return
		}
		user.Username = req.Username
	}

	if req.Bio != "" {
		user.Bio = req.Bio
	}

	// Save changes
	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User updated successfully",
		"user": gin.H{
			"id":         user.ID,
			"username":   user.Username,
			"email":      user.Email,
			"avatar_url": user.AvatarURL,
			"bio":        user.Bio,
		},
	})
}

// GetCurrentUserStats returns the current user's stats
func GetCurrentUserStats(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get user stats from database
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Return user stats
	c.JSON(http.StatusOK, gin.H{"stats": userStats})
}

// UpdateAvatar updates the user's avatar
func UpdateAvatar(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get avatar URL from request
	var req struct {
		AvatarURL string `json:"avatar_url" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update user's avatar URL
	if err := database.DB.Model(&models.User{}).Where("id = ?", userID).Update("avatar_url", req.AvatarURL).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update avatar"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Avatar updated successfully",
		"avatar_url": req.AvatarURL,
	})
}

// DeleteAccount deletes the user's account
func DeleteAccount(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse UUID
	uid, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Delete user's data
	if err := tx.Where("user_id = ?", uid).Delete(&models.UserStats{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user stats"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.UserUpgrade{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user upgrades"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.UserSecuritySystem{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user security systems"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.UserMission{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user missions"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.Vulnerability{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete vulnerabilities"})
		return
	}

	if err := tx.Where("attacker_id = ? OR defender_id = ?", uid, uid).Delete(&models.PvPAttack{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete PvP attacks"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.SecurityLog{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete security logs"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.Transaction{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete transactions"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.Notification{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete notifications"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.NotificationSettings{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete notification settings"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.UserAchievement{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user achievements"})
		return
	}

	if err := tx.Where("user_id = ?", uid).Delete(&models.Session{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete sessions"})
		return
	}

	// Finally, delete the user
	if err := tx.Delete(&models.User{}, uid).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Account deleted successfully"})
}