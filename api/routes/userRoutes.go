package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupUserRoutes sets up all user-related routes
func SetupUserRoutes(router *gin.Engine) {
	users := router.Group("/api/users")
	users.Use(middlewares.AuthMiddleware())
	{
		users.GET("/me", handlers.GetCurrentUser)
		users.PUT("/me", handlers.UpdateCurrentUser)
		users.GET("/me/stats", handlers.GetCurrentUserStats)
		users.PUT("/avatar", handlers.UpdateAvatar)
		users.DELETE("/me", handlers.DeleteAccount)
	}
}