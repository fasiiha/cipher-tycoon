package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupUpgradeRoutes sets up all upgrade-related routes
func SetupUpgradeRoutes(router *gin.Engine) {
	upgrades := router.Group("/api/upgrades")
	upgrades.Use(middlewares.AuthMiddleware())
	{
		upgrades.GET("", handlers.GetUpgrades)
		upgrades.GET("/:id", handlers.GetUpgrade)
		upgrades.POST("/:id/purchase", handlers.PurchaseUpgrade)
		upgrades.POST("/:id/upgrade", handlers.UpgradeLevel)
		upgrades.GET("/user", handlers.GetUserUpgrades)
	}

	// Admin routes for managing upgrades
	adminUpgrades := router.Group("/api/admin/upgrades")
	adminUpgrades.Use(middlewares.AuthMiddleware(), middlewares.AdminMiddleware())
	{
		adminUpgrades.POST("", handlers.CreateUpgrade)
		adminUpgrades.PUT("/:id", handlers.UpdateUpgrade)
		adminUpgrades.DELETE("/:id", handlers.DeleteUpgrade)
		adminUpgrades.POST("/:id/effects", handlers.AddUpgradeEffect)
		adminUpgrades.PUT("/:id/effects/:effectId", handlers.UpdateUpgradeEffect)
		adminUpgrades.DELETE("/:id/effects/:effectId", handlers.DeleteUpgradeEffect)
	}
}