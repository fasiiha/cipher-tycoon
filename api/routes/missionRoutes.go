package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupMissionRoutes sets up all mission-related routes
func SetupMissionRoutes(router *gin.Engine) {
	missions := router.Group("/api/missions")
	missions.Use(middlewares.AuthMiddleware())
	{
		missions.GET("", handlers.GetMissions)
		missions.GET("/:id", handlers.GetMission)
		missions.POST("/:id/start", handlers.StartMission)
		missions.POST("/:id/complete", handlers.CompleteMission)
		missions.POST("/:id/abort", handlers.AbortMission)
		missions.GET("/history", handlers.GetMissionHistory)
		missions.GET("/active", handlers.GetActiveMission)
	}

	// Admin routes for managing missions
	adminMissions := router.Group("/api/admin/missions")
	adminMissions.Use(middlewares.AuthMiddleware(), middlewares.AdminMiddleware())
	{
		adminMissions.POST("", handlers.CreateMission)
		adminMissions.PUT("/:id", handlers.UpdateMission)
		adminMissions.DELETE("/:id", handlers.DeleteMission)
	}
}