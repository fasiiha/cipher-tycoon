package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupAchievementRoutes sets up all achievement-related routes
func SetupAchievementRoutes(router *gin.Engine) {
	achievements := router.Group("/api/achievements")
	achievements.Use(middlewares.AuthMiddleware())
	{
		achievements.GET("", handlers.GetAchievements)
		achievements.GET("/user", handlers.GetUserAchievements)
		achievements.GET("/:id", handlers.GetAchievement)
	}

	// Admin routes for managing achievements
	adminAchievements := router.Group("/api/admin/achievements")
	adminAchievements.Use(middlewares.AuthMiddleware(), middlewares.AdminMiddleware())
	{
		adminAchievements.POST("", handlers.CreateAchievement)
		adminAchievements.PUT("/:id", handlers.UpdateAchievement)
		adminAchievements.DELETE("/:id", handlers.DeleteAchievement)
	}
}