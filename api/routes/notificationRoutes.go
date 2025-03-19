package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupNotificationRoutes sets up all notification-related routes
func SetupNotificationRoutes(router *gin.Engine) {
	notifications := router.Group("/api/notifications")
	notifications.Use(middlewares.AuthMiddleware())
	{
		notifications.GET("", handlers.GetNotifications)
		notifications.GET("/unread", handlers.GetUnreadNotifications)
		notifications.GET("/count", handlers.GetUnreadNotificationCount)
		notifications.PUT("/:id/read", handlers.MarkNotificationAsRead)
		notifications.PUT("/read-all", handlers.MarkAllNotificationsAsRead)
		notifications.DELETE("/:id", handlers.DeleteNotification)
		
		// Notification settings
		notifications.GET("/settings", handlers.GetNotificationSettings)
		notifications.PUT("/settings", handlers.UpdateNotificationSettings)
	}
}