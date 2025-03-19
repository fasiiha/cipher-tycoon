package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupLeaderboardRoutes sets up all leaderboard-related routes
func SetupLeaderboardRoutes(router *gin.Engine) {
	leaderboard := router.Group("/api/leaderboard")
	leaderboard.Use(middlewares.AuthMiddleware())
	{
		leaderboard.GET("/global", handlers.GetGlobalLeaderboard)
		leaderboard.GET("/pvp", handlers.GetPvPLeaderboard)
		leaderboard.GET("/missions", handlers.GetMissionsLeaderboard)
		leaderboard.GET("/weekly", handlers.GetWeeklyLeaderboard)
		leaderboard.GET("/user-rank", handlers.GetUserRank)
	}
}