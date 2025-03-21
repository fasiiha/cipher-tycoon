package handlers

import (
	"log"
	"net/http"
	"time"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/fasiiha/hacker-tycoon/api/models"
	"github.com/fasiiha/hacker-tycoon/api/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// RegisterRequest represents the request body for user registration
type RegisterRequest struct {
	Username string `json:"username" binding:"required,min=3,max=50"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

// LoginRequest represents the request body for user login
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// ForgotPasswordRequest represents the request body for forgot password
type ForgotPasswordRequest struct {
	Email string `json:"email" binding:"required,email"`
}

// VerifyResetCodeRequest represents the request body for verifying reset code
type VerifyResetCodeRequest struct {
	Email string `json:"email" binding:"required,email"`
	Code  string `json:"code" binding:"required"`
}

// ResetPasswordRequest represents the request body for resetting password
type ResetPasswordRequest struct {
	Email       string `json:"email" binding:"required,email"`
	Code        string `json:"code" binding:"required"`
	NewPassword string `json:"new_password" binding:"required,min=8"`
}

// Register handles user registration
func Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if username already exists
	var existingUser models.User
	if result := database.DB.Where("username = ?", req.Username).First(&existingUser); result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
		return
	}

	// Check if email already exists
	if result := database.DB.Where("email = ?", req.Email).First(&existingUser); result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(req.Password)
	log.Println("req.Password: ", req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	log.Println("hashedPassword: ", hashedPassword)

	// Create user
	user := models.User{
		Username:     req.Username,
		Email:        req.Email,
		PasswordHash: hashedPassword,
	}

	// Begin transaction
	tx := database.DB.Begin()

	// Save user
	if err := tx.Create(&user).Error; err != nil {
		tx.Rollback()
		log.Printf("User creation error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// Create user stats
	userStats := models.UserStats{
		UserID: user.ID,
	}

	if err := tx.Create(&userStats).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user stats"})
		return
	}

	// Create notification settings
	notificationSettings := models.NotificationSettings{
		UserID: user.ID,
	}

	if err := tx.Create(&notificationSettings).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create notification settings"})
		return
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	// Send welcome email
	go utils.SendWelcomeEmail(user.Email, user.Username)

	c.JSON(http.StatusCreated, gin.H{
		"message": "User registered successfully",
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		},
	})
}

// Login handles user login
func Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by email
	var user models.User
	if result := database.DB.Where("email = ?", req.Email).First(&user); result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check if user is active
	if !user.IsActive {
		c.JSON(http.StatusForbidden, gin.H{"error": "Account is inactive"})
		return
	}

	// Verify password
	if !utils.CheckPasswordHash(req.Password, user.PasswordHash) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Create session
	session := models.Session{
		UserID:    user.ID,
		IPAddress: c.ClientIP(),
		UserAgent: c.Request.UserAgent(),
		ExpiresAt: time.Now().Add(168 * time.Hour), // 7 days
		IsActive:  true,
	}

	if err := database.DB.Create(&session).Error; err != nil {
		log.Printf("Failed to create session: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create session"})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateJWT(user.ID, user.Username, user.Email, user.IsAdmin, session.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Update last login time
	now := time.Now()
	user.LastLogin = &now
	database.DB.Save(&user)

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"isAdmin":  user.IsAdmin,
		},
	})
}

// Logout handles user logout
func Logout(c *gin.Context) {
	// Get session ID from context
	sessionID, exists := c.Get("sessionID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID not found"})
		return
	}

	// Invalidate session
	if err := database.DB.Model(&models.Session{}).Where("id = ?", sessionID).Update("is_active", false).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to logout"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

// ForgotPassword handles password reset requests
func ForgotPassword(c *gin.Context) {
	var req ForgotPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by email
	var user models.User
	if result := database.DB.Where("email = ?", req.Email).First(&user); result.Error != nil {
		// Don't reveal that the email doesn't exist
		c.JSON(http.StatusOK, gin.H{"message": "If your email is registered, you will receive a reset code"})
		return
	}

	// Generate reset code
	resetCode := utils.GenerateVerificationCode(6)
	
	// Set expiration time (15 minutes)
	expiresAt := time.Now().Add(15 * time.Minute)
	
	// Save reset token and expiration
	if err := database.DB.Model(&user).Updates(map[string]interface{}{
		"reset_token":         resetCode,
		"reset_token_expires": expiresAt,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process request"})
		return
	}

	// Send reset email
	go utils.SendPasswordResetEmail(user.Email, resetCode)

	c.JSON(http.StatusOK, gin.H{"message": "If your email is registered, you will receive a reset code"})
}

// VerifyResetCode verifies the password reset code
func VerifyResetCode(c *gin.Context) {
	var req VerifyResetCodeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by email
	var user models.User
	if result := database.DB.Where("email = ?", req.Email).First(&user); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email or code"})
		return
	}

	// Check if reset token exists and is not expired
	if user.ResetToken == "" || user.ResetTokenExpires == nil || time.Now().After(*user.ResetTokenExpires) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired code"})
		return
	}

	// Verify code
	if user.ResetToken != req.Code {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid code"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Code verified successfully"})
}

// ResetPassword resets the user's password
func ResetPassword(c *gin.Context) {
	var req ResetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by email
	var user models.User
	if result := database.DB.Where("email = ?", req.Email).First(&user); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email or code"})
		return
	}

	// Check if reset token exists and is not expired
	if user.ResetToken == "" || user.ResetTokenExpires == nil || time.Now().After(*user.ResetTokenExpires) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired code"})
		return
	}

	// Verify code
	if user.ResetToken != req.Code {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid code"})
		return
	}

	// Hash new password
	hashedPassword, err := utils.HashPassword(req.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Update password and clear reset token
	if err := database.DB.Model(&user).Updates(map[string]interface{}{
		"password_hash":       hashedPassword,
		"reset_token":         "",
		"reset_token_expires": nil,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to reset password"})
		return
	}

	// Invalidate all active sessions for this user
	if err := database.DB.Model(&models.Session{}).Where("user_id = ? AND is_active = ?", user.ID, true).Update("is_active", false).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to invalidate sessions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password reset successfully"})
}

// GetSessions returns all active sessions for the current user
func GetSessions(c *gin.Context) {
	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Get all active sessions
	var sessions []models.Session
	if err := database.DB.Where("user_id = ? AND is_active = ?", userID, true).Find(&sessions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get sessions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"sessions": sessions})
}

// RevokeSession revokes a specific session
func RevokeSession(c *gin.Context) {
	// Get session ID from URL
	sessionID := c.Param("id")
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID is required"})
		return
	}

	// Parse UUID
	sessionUUID, err := uuid.Parse(sessionID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session ID"})
		return
	}

	// Get user ID from context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Check if session belongs to user
	var session models.Session
	if result := database.DB.Where("id = ? AND user_id = ?", sessionUUID, userID).First(&session); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}

	// Revoke session
	if err := database.DB.Model(&session).Update("is_active", false).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to revoke session"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Session revoked successfully"})
}