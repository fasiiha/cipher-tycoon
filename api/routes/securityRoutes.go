package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupSecurityRoutes sets up all security-related routes
func SetupSecurityRoutes(router *gin.Engine) {
	security := router.Group("/api/security")
	security.Use(middlewares.AuthMiddleware())
	{
		// Security systems
		security.GET("/systems", handlers.GetSecuritySystems)
		security.GET("/systems/:id", handlers.GetSecuritySystem)
		security.POST("/systems/:id/purchase", handlers.PurchaseSecuritySystem)
		security.POST("/systems/:id/upgrade", handlers.UpgradeSecuritySystem)
		security.GET("/systems/user", handlers.GetUserSecuritySystems)
		
		// Vulnerabilities
		security.GET("/vulnerabilities", handlers.GetVulnerabilities)
		security.POST("/vulnerabilities/:id/fix", handlers.FixVulnerability)
		security.POST("/scan", handlers.ScanForVulnerabilities)
		
		// Security logs
		security.GET("/logs", handlers.GetSecurityLogs)
		security.POST("/logs/:id/resolve", handlers.ResolveSecurityLog)
	}

	// Admin routes for managing security systems
	adminSecurity := router.Group("/api/admin/security")
	adminSecurity.Use(middlewares.AuthMiddleware(), middlewares.AdminMiddleware())
	{
		// adminSecurity.POST("/systems", handlers.CreateSecuritySystem)
		// adminSecurity.PUT("/systems/:id", handlers.UpdateSecuritySystem)
		// adminSecurity.DELETE("/systems/:id", handlers.DeleteSecuritySystem)
	}
}