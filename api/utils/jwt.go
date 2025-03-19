package utils

import (
	"crypto/rand"
	"errors"
	"math/big"
	"os"
	"time"

	mathrand "math/rand"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

var (
	// secureRandom is a cryptographically secure random number generator
	secureRandom = mathrand.New(mathrand.NewSource(time.Now().UnixNano()))
)

// JWTClaims represents the claims in a JWT
type JWTClaims struct {
	UserID    uuid.UUID `json:"user_id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	IsAdmin   bool      `json:"is_admin"`
	SessionID uuid.UUID `json:"session_id"`
	jwt.RegisteredClaims
}

// GenerateJWT generates a new JWT token
func GenerateJWT(userID uuid.UUID, username, email string, isAdmin bool, sessionID uuid.UUID) (string, error) {
	// Get JWT expiration time from environment
	expirationTime, err := time.ParseDuration(os.Getenv("JWT_EXPIRATION"))
	if err != nil {
		expirationTime = 24 * time.Hour // Default to 24 hours
	}

	// Create claims
	claims := JWTClaims{
		UserID:    userID,
		Username:  username,
		Email:     email,
		IsAdmin:   isAdmin,
		SessionID: sessionID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(expirationTime)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "hacker-tycoon-api",
			Subject:   userID.String(),
		},
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign token with secret key
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidateJWT validates a JWT token and returns the claims
func ValidateJWT(tokenString string) (*JWTClaims, error) {
	// Parse token
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return nil, err
	}

	// Validate token and extract claims
	if claims, ok := token.Claims.(*JWTClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("invalid token")
}

// GenerateRefreshToken generates a new refresh token
func GenerateRefreshToken() (string, error) {
	// Generate a random 32-byte token
	n, err := rand.Int(rand.Reader, big.NewInt(1000000))
	if err != nil {
		return "", err
	}
	return n.String() + GenerateRandomString(32), nil
}