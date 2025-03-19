package handlers

import (
	"net/http"
	"time"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetTransactions returns all transactions for the current user
func GetTransactions(c *gin.Context) {
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

	// Get transactions
	var transactions []models.Transaction
	if err := database.DB.Where("user_id = ?", userUUID).Order("created_at DESC").Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get transactions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transactions": transactions})
}

// GetTransaction returns details of a specific transaction
func GetTransaction(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get transaction ID from URL
	transactionID := c.Param("id")
	if transactionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Transaction ID is required"})
		return
	}

	// Parse UUIDs
	userUUID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	transactionUUID, err := uuid.Parse(transactionID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid transaction ID"})
		return
	}

	// Get transaction
	var transaction models.Transaction
	if err := database.DB.Where("id = ? AND user_id = ?", transactionUUID, userUUID).First(&transaction).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"transaction": transaction})
}

// GetTransactionSummary returns a summary of transactions for the current user
func GetTransactionSummary(c *gin.Context) {
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

	// Get time range from query parameters
	timeRange := c.DefaultQuery("range", "week")

	// Calculate start date based on time range
	var startDate time.Time
	now := time.Now()
	
	switch timeRange {
	case "day":
		startDate = now.AddDate(0, 0, -1)
	case "week":
		startDate = now.AddDate(0, 0, -7)
	case "month":
		startDate = now.AddDate(0, -1, 0)
	case "year":
		startDate = now.AddDate(-1, 0, 0)
	default:
		startDate = now.AddDate(0, 0, -7) // Default to week
	}

	// Get total income
	var totalIncome int64
	if err := database.DB.Model(&models.Transaction{}).Where("user_id = ? AND amount > 0 AND created_at >= ?", userUUID, startDate).Select("COALESCE(SUM(amount), 0)").Row().Scan(&totalIncome); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to calculate total income"})
		return
	}

	// Get total expenses
	var totalExpenses int64
	if err := database.DB.Model(&models.Transaction{}).Where("user_id = ? AND amount < 0 AND created_at >= ?", userUUID, startDate).Select("COALESCE(SUM(amount), 0)").Row().Scan(&totalExpenses); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to calculate total expenses"})
		return
	}

	// Get transaction counts by type
	type TransactionTypeCount struct {
		TransactionType string `json:"transaction_type"`
		Count           int    `json:"count"`
		Total           int    `json:"total"`
	}

	var typeCounts []TransactionTypeCount
	if err := database.DB.Model(&models.Transaction{}).
		Select("transaction_type, COUNT(*) as count, SUM(amount) as total").
		Where("user_id = ? AND created_at >= ?", userUUID, startDate).
		Group("transaction_type").
		Scan(&typeCounts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get transaction type counts"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"time_range":     timeRange,
		"total_income":   totalIncome,
		"total_expenses": totalExpenses,
		"net_change":     totalIncome + totalExpenses,
		"type_summary":   typeCounts,
	})
}