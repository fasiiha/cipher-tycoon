package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupAuthRoutes sets up all auth-related routes
func SetupAuthRoutes(router *gin.Engine) {
	auth := router.Group("/api/auth")
	{
		auth.POST("/register", handlers.Register)
		auth.POST("/login", handlers.Login)
		auth.POST("/logout", middlewares.AuthMiddleware(), handlers.Logout)
		auth.POST("/forgot-password", handlers.ForgotPassword)
		auth.POST("/verify-reset-code", handlers.VerifyResetCode)
		auth.POST("/reset-password", handlers.ResetPassword)
		
		// Protected routes
		auth.GET("/sessions", middlewares.AuthMiddleware(), handlers.GetSessions)
		auth.DELETE("/sessions/:id", middlewares.AuthMiddleware(), handlers.RevokeSession)
	}
}