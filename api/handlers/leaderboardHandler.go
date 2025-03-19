package handlers

import (
	"net/http"
	"time"

	"github.com/fasiiha/hacker-tycoon/api/database"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// LeaderboardEntry represents an entry in the leaderboard
type LeaderboardEntry struct {
	UserID       uuid.UUID `json:"user_id"`
	Username     string    `json:"username"`
	AvatarURL    string    `json:"avatar_url"`
	Level        int       `json:"level"`
	Score        int       `json:"score"`
	Rank         int       `json:"rank"`
	IsCurrentUser bool     `json:"is_current_user"`
}

// GetGlobalLeaderboard returns the global leaderboard
func GetGlobalLeaderboard(c *gin.Context) {
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

	// Get leaderboard entries
	var entries []LeaderboardEntry
	rows, err := database.DB.Raw(`
		SELECT 
			u.id as user_id, 
			u.username, 
			u.avatar_url, 
			s.level, 
			(s.experience + s.crypto_balance + s.reputation * 10) as score,
			ROW_NUMBER() OVER (ORDER BY (s.experience + s.crypto_balance + s.reputation * 10) DESC) as rank,
			CASE WHEN u.id = ? THEN true ELSE false END as is_current_user
		FROM users u
		JOIN user_stats s ON u.id = s.user_id
		ORDER BY score DESC
		LIMIT 100
	`, userUUID).Rows()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get leaderboard"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var entry LeaderboardEntry
		if err := database.DB.ScanRows(rows, &entry); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan leaderboard entry"})
			return
		}
		entries = append(entries, entry)
	}

	c.JSON(http.StatusOK, gin.H{"leaderboard": entries})
}

// GetPvPLeaderboard returns the PvP leaderboard
func GetPvPLeaderboard(c *gin.Context) {
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

	// Get leaderboard entries
	var entries []LeaderboardEntry
	rows, err := database.DB.Raw(`
		SELECT 
			u.id as user_id, 
			u.username, 
			u.avatar_url, 
			s.level, 
			(s.pvp_wins * 10 - s.pvp_losses * 5) as score,
			ROW_NUMBER() OVER (ORDER BY (s.pvp_wins * 10 - s.pvp_losses * 5) DESC) as rank,
			CASE WHEN u.id = ? THEN true ELSE false END as is_current_user
		FROM users u
		JOIN user_stats s ON u.id = s.user_id
		WHERE s.pvp_wins > 0
		ORDER BY score DESC
		LIMIT 100
	`, userUUID).Rows()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get PvP leaderboard"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var entry LeaderboardEntry
		if err := database.DB.ScanRows(rows, &entry); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan leaderboard entry"})
			return
		}
		entries = append(entries, entry)
	}

	c.JSON(http.StatusOK, gin.H{"leaderboard": entries})
}

// GetMissionsLeaderboard returns the missions leaderboard
func GetMissionsLeaderboard(c *gin.Context) {
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

	// Get leaderboard entries
	var entries []LeaderboardEntry
	rows, err := database.DB.Raw(`
		SELECT 
			u.id as user_id, 
			u.username, 
			u.avatar_url, 
			s.level, 
			s.missions_completed as score,
			ROW_NUMBER() OVER (ORDER BY s.missions_completed DESC) as rank,
			CASE WHEN u.id = ? THEN true ELSE false END as is_current_user
		FROM users u
		JOIN user_stats s ON u.id = s.user_id
		WHERE s.missions_completed > 0
		ORDER BY score DESC
		LIMIT 100
	`, userUUID).Rows()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get missions leaderboard"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var entry LeaderboardEntry
		if err := database.DB.ScanRows(rows, &entry); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan leaderboard entry"})
			return
		}
		entries = append(entries, entry)
	}

	c.JSON(http.StatusOK, gin.H{"leaderboard": entries})
}

// GetWeeklyLeaderboard returns the weekly leaderboard
func GetWeeklyLeaderboard(c *gin.Context) {
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

	// Calculate start of week
	now := time.Now()
	startOfWeek := now.AddDate(0, 0, -int(now.Weekday()))
	startOfWeek = time.Date(startOfWeek.Year(), startOfWeek.Month(), startOfWeek.Day(), 0, 0, 0, 0, startOfWeek.Location())

	// Get weekly missions completed
	type WeeklyStats struct {
		UserID            uuid.UUID `json:"user_id"`
		Username          string    `json:"username"`
		AvatarURL         string    `json:"avatar_url"`
		Level             int       `json:"level"`
		WeeklyMissions    int       `json:"weekly_missions"`
		WeeklyPvPWins     int       `json:"weekly_pvp_wins"`
		WeeklyScore       int       `json:"weekly_score"`
		Rank              int       `json:"rank"`
		IsCurrentUser     bool      `json:"is_current_user"`
	}

	var entries []WeeklyStats
	rows, err := database.DB.Raw(`
		WITH weekly_missions AS (
			SELECT 
				user_id, 
				COUNT(*) as mission_count
			FROM user_missions
			WHERE status = 'Completed' AND completed_at >= ?
			GROUP BY user_id
		),
		weekly_pvp AS (
			SELECT 
				attacker_id as user_id, 
				COUNT(*) as pvp_wins
			FROM pvp_attacks
			WHERE result = 'success' AND attack_timestamp >= ?
			GROUP BY attacker_id
		)
		SELECT 
			u.id as user_id, 
			u.username, 
			u.avatar_url, 
			s.level, 
			COALESCE(wm.mission_count, 0) as weekly_missions,
			COALESCE(wp.pvp_wins, 0) as weekly_pvp_wins,
			(COALESCE(wm.mission_count, 0) * 10 + COALESCE(wp.pvp_wins, 0) * 5) as weekly_score,
			ROW_NUMBER() OVER (ORDER BY (COALESCE(wm.mission_count, 0) * 10 + COALESCE(wp.pvp_wins, 0) * 5) DESC) as rank,
			CASE WHEN u.id = ? THEN true ELSE false END as is_current_user
		FROM users u
		JOIN user_stats s ON u.id = s.user_id
		LEFT JOIN weekly_missions wm ON u.id = wm.user_id
		LEFT JOIN weekly_pvp wp ON u.id = wp.user_id
		WHERE COALESCE(wm.mission_count, 0) > 0 OR COALESCE(wp.pvp_wins, 0) > 0
		ORDER BY weekly_score DESC
		LIMIT 100
	`, startOfWeek, startOfWeek, userUUID).Rows()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get weekly leaderboard"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var entry WeeklyStats
		if err := database.DB.ScanRows(rows, &entry); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan leaderboard entry"})
			return
		}
		entries = append(entries, entry)
	}

	c.JSON(http.StatusOK, gin.H{
		"leaderboard": entries,
		"start_date": startOfWeek,
		"end_date": startOfWeek.AddDate(0, 0, 7),
	})
}

// GetUserRank returns the current user's rank in different leaderboards
func GetUserRank(c *gin.Context) {
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

	// Get global rank
	var globalRank int
	if err := database.DB.Raw(`
		SELECT rank FROM (
			SELECT 
				u.id,
				ROW_NUMBER() OVER (ORDER BY (s.experience + s.crypto_balance + s.reputation * 10) DESC) as rank
			FROM users u
			JOIN user_stats s ON u.id = s.user_id
		) as ranks
		WHERE id = ?
	`, userUUID).Scan(&globalRank).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get global rank"})
		return
	}

	// Get PvP rank
	var pvpRank int
	if err := database.DB.Raw(`
		SELECT rank FROM (
			SELECT 
				u.id,
				ROW_NUMBER() OVER (ORDER BY (s.pvp_wins * 10 - s.pvp_losses * 5) DESC) as rank
			FROM users u
			JOIN user_stats s ON u.id = s.user_id
			WHERE s.pvp_wins > 0
		) as ranks
		WHERE id = ?
	`, userUUID).Scan(&pvpRank).Error; err != nil {
		pvpRank = 0 // User might not have PvP wins
	}

	// Get missions rank
	var missionsRank int
	if err := database.DB.Raw(`
		SELECT rank FROM (
			SELECT 
				u.id,
				ROW_NUMBER() OVER (ORDER BY s.missions_completed DESC) as rank
			FROM users u
			JOIN user_stats s ON u.id = s.user_id
			WHERE s.missions_completed >  as rank
			FROM users u
			JOIN user_stats s ON u.id = s.user_id
			WHERE s.missions_completed > 0
		) as ranks
		WHERE id = ?
	`, userUUID).Scan(&missionsRank).Error; err != nil {
		missionsRank = 0 // User might not have completed missions
	}

	// Calculate weekly rank
	now := time.Now()
	startOfWeek := now.AddDate(0, 0, -int(now.Weekday()))
	startOfWeek = time.Date(startOfWeek.Year(), startOfWeek.Month(), startOfWeek.Day(), 0, 0, 0, 0, startOfWeek.Location())

	var weeklyRank int
	if err := database.DB.Raw(`
		WITH weekly_missions AS (
			SELECT 
				user_id, 
				COUNT(*) as mission_count
			FROM user_missions
			WHERE status = 'Completed' AND completed_at >= ?
			GROUP BY user_id
		),
		weekly_pvp AS (
			SELECT 
				attacker_id as user_id, 
				COUNT(*) as pvp_wins
			FROM pvp_attacks
			WHERE result = 'success' AND attack_timestamp >= ?
			GROUP BY attacker_id
		)
		SELECT rank FROM (
			SELECT 
				u.id,
				ROW_NUMBER() OVER (ORDER BY (COALESCE(wm.mission_count, 0) * 10 + COALESCE(wp.pvp_wins, 0) * 5) DESC) as rank
			FROM users u
			LEFT JOIN weekly_missions wm ON u.id = wm.user_id
			LEFT JOIN weekly_pvp wp ON u.id = wp.user_id
			WHERE COALESCE(wm.mission_count, 0) > 0 OR COALESCE(wp.pvp_wins, 0) > 0
		) as ranks
		WHERE id = ?
	`, startOfWeek, startOfWeek, userUUID).Scan(&weeklyRank).Error; err != nil {
		weeklyRank = 0 // User might not have weekly activity
	}

	c.JSON(http.StatusOK, gin.H{
		"global_rank": globalRank,
		"pvp_rank": pvpRank,
		"missions_rank": missionsRank,
		"weekly_rank": weeklyRank,
	})
}