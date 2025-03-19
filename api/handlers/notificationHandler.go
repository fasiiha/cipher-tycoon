package handlers

import (
	"net/http"
	"time"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetNotifications returns all notifications for the current user
func GetNotifications(c *gin.Context) {
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

	// Get notifications
	var notifications []models.Notification
	if err := database.DB.Where("user_id = ?", userUUID).Order("created_at DESC").Find(&notifications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get notifications"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"notifications": notifications})
}

// GetUnreadNotifications returns unread notifications for the current user
func GetUnreadNotifications(c *gin.Context) {
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

	// Get unread notifications
	var notifications []models.Notification
	if err := database.DB.Where("user_id = ? AND is_read = ?", userUUID, false).Order("created_at DESC").Find(&notifications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get unread notifications"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"notifications": notifications})
}

// GetUnreadNotificationCount returns the count of unread notifications
func GetUnreadNotificationCount(c *gin.Context) {
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

	// Count unread notifications
	var count int64
	if err := database.DB.Model(&models.Notification{}).Where("user_id = ? AND is_read = ?", userUUID, false).Count(&count).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count unread notifications"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"count": count})
}

// MarkNotificationAsRead marks a notification as read
func MarkNotificationAsRead(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get notification ID from URL
	notificationID := c.Param("id")
	if notificationID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Notification ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	notificationUUID, err := uuid.Parse(notificationID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid notification ID"})
		return
	}

	// Get notification
	var notification models.Notification
	if err := database.DB.Where("id = ? AND user_id = ?", notificationUUID, userUUID).First(&notification).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notification not found"})
		return
	}

	// Check if notification is already read
	if notification.IsRead {
		c.JSON(http.StatusOK, gin.H{"message": "Notification is already marked as read"})
		return
	}

	// Update notification
	now := time.Now()
	notification.IsRead = true
	notification.ReadAt = &now

	if err := database.DB.Save(&notification).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to mark notification as read"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Notification marked as read",
		"notification": notification,
	})
}

// MarkAllNotificationsAsRead marks all notifications as read
func MarkAllNotificationsAsRead(c *gin.Context) {
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

	// Update all unread notifications
	now := time.Now()
	if err := database.DB.Model(&models.Notification{}).Where("user_id = ? AND is_read = ?", userUUID, false).Updates(map[string]interface{}{
		"is_read": true,
		"read_at": now,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to mark notifications as read"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "All notifications marked as read"})
}

// DeleteNotification deletes a notification
func DeleteNotification(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get notification ID from URL
	notificationID := c.Param("id")
	if notificationID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Notification ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	notificationUUID, err := uuid.Parse(notificationID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid notification ID"})
		return
	}

	// Delete notification
	if err := database.DB.Where("id = ? AND user_id = ?", notificationUUID, userUUID).Delete(&models.Notification{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete notification"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Notification deleted successfully"})
}

// UpdateNotificationSettingsRequest represents the request body for updating notification settings
type UpdateNotificationSettingsRequest struct {
	EmailNotifications bool `json:"email_notifications"`
	SecurityAlerts     bool `json:"security_alerts"`
	MarketingEmails    bool `json:"marketing_emails"`
	GameUpdates        bool `json:"game_updates"`
	CommunityMessages  bool `json:"community_messages"`
}

// GetNotificationSettings returns notification settings for the current user
func GetNotificationSettings(c *gin.Context) {
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

	// Get notification settings
	var settings models.NotificationSettings
	if err := database.DB.Where("user_id = ?", userUUID).First(&settings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notification settings not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"settings": settings})
}

// UpdateNotificationSettings updates notification settings for the current user
func UpdateNotificationSettings(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse request body
	var req UpdateNotificationSettingsRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get notification settings
	var settings models.NotificationSettings
	if err := database.DB.Where("user_id = ?", userUUID).First(&settings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notification settings not found"})
		return
	}

	// Update settings
	settings.EmailNotifications = req.EmailNotifications
	settings.SecurityAlerts = req.SecurityAlerts
	settings.MarketingEmails = req.MarketingEmails
	settings.GameUpdates = req.GameUpdates
	settings.CommunityMessages = req.CommunityMessages

	if err := database.DB.Save(&settings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update notification settings"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Notification settings updated successfully",
		"settings": settings,
	})
}