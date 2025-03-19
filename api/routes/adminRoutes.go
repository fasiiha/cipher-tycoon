package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupAdminRoutes sets up all admin-related routes
func SetupAdminRoutes(router *gin.Engine) {
	admin := router.Group("/api/admin")
	admin.Use(middlewares.AuthMiddleware(), middlewares.AdminMiddleware())
	{
		// User management
		admin.GET("/users", handlers.GetAllUsers)
		admin.GET("/users/:id", handlers.GetUserByID)
		admin.PUT("/users/:id", handlers.UpdateUser)
		admin.DELETE("/users/:id", handlers.DeleteUser)
		admin.POST("/users/:id/make-admin", handlers.MakeUserAdmin)
		admin.POST("/users/:id/remove-admin", handlers.RemoveUserAdmin)
		
		// Stats and analytics
		admin.GET("/stats", handlers.GetAdminStats)
		// admin.GET("/activity-log", handlers.GetActivityLog)
		
		// Game management
		// admin.POST("/reset-server", handlers.ResetServer)
		// admin.POST("/maintenance-mode", handlers.SetMaintenanceMode)
		// admin.GET("/maintenance-mode", handlers.GetMaintenanceMode)
	}
}