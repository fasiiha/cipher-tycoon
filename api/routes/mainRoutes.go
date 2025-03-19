package routes

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes sets up all routes for the API
func SetupRoutes(router *gin.Engine) {
	// Set up individual route groups
	SetupAuthRoutes(router)
	SetupUserRoutes(router)
	SetupMissionRoutes(router)
	SetupUpgradeRoutes(router)
	SetupSecurityRoutes(router)
	SetupPvPRoutes(router)
	SetupTransactionRoutes(router)
	SetupNotificationRoutes(router)
	SetupAchievementRoutes(router)
	SetupLeaderboardRoutes(router)
	SetupWeb3Routes(router)
	SetupAdminRoutes(router)
}