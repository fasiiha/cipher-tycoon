package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupPvPRoutes sets up all PvP-related routes
func SetupPvPRoutes(router *gin.Engine) {
	pvp := router.Group("/api/pvp")
	pvp.Use(middlewares.AuthMiddleware())
	{
		pvp.GET("/targets", handlers.GetPvPTargets)
		pvp.POST("/attack/:id", handlers.AttackPlayer)
		pvp.GET("/attacks", handlers.GetPvPAttackHistory)
		pvp.GET("/defenses", handlers.GetPvPDefenseHistory)
		pvp.GET("/cooldown", handlers.GetAttackCooldown)
	}
}