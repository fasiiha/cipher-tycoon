package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupTransactionRoutes sets up all transaction-related routes
func SetupTransactionRoutes(router *gin.Engine) {
	transactions := router.Group("/api/transactions")
	transactions.Use(middlewares.AuthMiddleware())
	{
		transactions.GET("", handlers.GetTransactions)
		transactions.GET("/:id", handlers.GetTransaction)
		transactions.GET("/summary", handlers.GetTransactionSummary)
	}
}