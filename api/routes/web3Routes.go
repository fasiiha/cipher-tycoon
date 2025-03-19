package routes

import (
	"github.com/fasiiha/hacker-tycoon/api/handlers"
	"github.com/fasiiha/hacker-tycoon/api/middlewares"
	"github.com/gin-gonic/gin"
)

// SetupWeb3Routes sets up all Web3-related routes
func SetupWeb3Routes(router *gin.Engine) {
	web3 := router.Group("/api/web3")
	web3.Use(middlewares.AuthMiddleware())
	{
		web3.POST("/connect-wallet", handlers.ConnectWallet)
		web3.GET("/wallet-info", handlers.GetWalletInfo)
		web3.POST("/withdraw", handlers.WithdrawCrypto)
		web3.POST("/deposit", handlers.DepositCrypto)
		web3.GET("/transactions", handlers.GetWeb3Transactions)
	}
}