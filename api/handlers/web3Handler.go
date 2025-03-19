package handlers

import (
	"net/http"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// ConnectWalletRequest represents the request body for connecting a wallet
type ConnectWalletRequest struct {
	WalletAddress string `json:"wallet_address" binding:"required"`
}

// WithdrawCryptoRequest represents the request body for withdrawing crypto
type WithdrawCryptoRequest struct {
	Amount int `json:"amount" binding:"required,min=1"`
}

// DepositCryptoRequest represents the request body for depositing crypto
type DepositCryptoRequest struct {
	Amount        int    `json:"amount" binding:"required,min=1"`
	TransactionID string `json:"transaction_id" binding:"required"`
}

// ConnectWallet connects a wallet to the user's account
func ConnectWallet(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse request body
	var req ConnectWalletRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Update user's wallet address
	if err := database.DB.Model(&models.User{}).Where("id = ?", userUUID).Update("wallet_address", req.WalletAddress).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect wallet"})
		return
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Wallet Connected",
		Message:          "Your wallet has been successfully connected to your account.",
		NotificationType: "Web3",
	}

	if err := database.DB.Create(&notification).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":        "Wallet connected successfully",
		"wallet_address": req.WalletAddress,
	})
}

// GetWalletInfo returns the user's wallet information
func GetWalletInfo(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get user's wallet address
	var user models.User
	if err := database.DB.Select("wallet_address").First(&user, "id = ?", userUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Get user's crypto balance
	var userStats models.UserStats
	if err := database.DB.Select("crypto_balance").Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Get Web3 transactions
	var transactions []models.Transaction
	if err := database.DB.Where("user_id = ? AND (transaction_type = ? OR transaction_type = ?)", userUUID, "Web3 Deposit", "Web3 Withdrawal").Order("created_at DESC").Limit(5).Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get transactions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"wallet_address":  user.WalletAddress,
		"crypto_balance":  userStats.CryptoBalance,
		"transactions":    transactions,
		"wallet_connected": user.WalletAddress != "",
	})
}

// WithdrawCrypto withdraws crypto from the user's account
func WithdrawCrypto(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse request body
	var req WithdrawCryptoRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get user's wallet address
	var user models.User
	if err := database.DB.Select("wallet_address").First(&user, "id = ?", userUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check if wallet is connected
	if user.WalletAddress == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wallet not connected"})
		return
	}

	// Get user's crypto balance
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Check if user has enough crypto
	if userStats.CryptoBalance < req.Amount {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient funds"})
		return
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Update user's crypto balance
	if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Update("crypto_balance", userStats.CryptoBalance-req.Amount).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update crypto balance"})
		return
	}

	// Create transaction record
	transaction := models.Transaction{
		UserID:          userUUID,
		Amount:          -req.Amount,
		TransactionType: "Web3 Withdrawal",
		Description:     "Withdrawal to wallet " + user.WalletAddress,
	}

	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Crypto Withdrawal",
		Message:          "You have successfully withdrawn " + string(rune(req.Amount)) + " HTC to your wallet.",
		NotificationType: "Web3",
	}

	if err := tx.Create(&notification).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":        "Withdrawal successful",
		"amount":         req.Amount,
		"wallet_address": user.WalletAddress,
		"transaction_id": transaction.ID,
	})
}

// DepositCrypto deposits crypto to the user's account
func DepositCrypto(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse request body
	var req DepositCryptoRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get user's wallet address
	var user models.User
	if err := database.DB.Select("wallet_address").First(&user, "id = ?", userUUID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check if wallet is connected
	if user.WalletAddress == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wallet not connected"})
		return
	}

	// Get user's crypto balance
	var userStats models.UserStats
	if err := database.DB.Where("user_id = ?", userUUID).First(&userStats).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User stats not found"})
		return
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Update user's crypto balance
	if err := tx.Model(&models.UserStats{}).Where("user_id = ?", userUUID).Update("crypto_balance", userStats.CryptoBalance+req.Amount).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update crypto balance"})
		return
	}

	// Create transaction record
	transaction := models.Transaction{
		UserID:          userUUID,
		Amount:          req.Amount,
		TransactionType: "Web3 Deposit",
		Description:     "Deposit from wallet " + user.WalletAddress,
	}

	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// Create notification
	notification := models.Notification{
		UserID:           userUUID,
		Title:            "Crypto Deposit",
		Message:          "You have successfully deposited " + string(rune(req.Amount)) + " HTC from your wallet.",
		NotificationType: "Web3",
	}

	if err := tx.Create(&notification).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":        "Deposit successful",
		"amount":         req.Amount,
		"wallet_address": user.WalletAddress,
		"transaction_id": transaction.ID,
	})
}

// GetWeb3Transactions returns Web3-related transactions for the current user
func GetWeb3Transactions(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Parse UUID
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Get Web3 transactions
	var transactions []models.Transaction
	if err := database.DB.Where("user_id = ? AND (transaction_type = ? OR transaction_type = ?)", userUUID, "Web3 Deposit", "Web3 Withdrawal").Order("created_at DESC").Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get transactions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transactions": transactions})
}