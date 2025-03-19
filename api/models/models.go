package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID                   uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Username             string     `gorm:"type:varchar(50);unique;not null" json:"username"`
	Email                string     `gorm:"type:varchar(255);unique;not null" json:"email"`
	PasswordHash         string     `gorm:"type:varchar(255);not null" json:"password_hash"`
	AvatarURL            string     `gorm:"type:varchar(255);" json:"avatar_url"`
	Bio                  string     `gorm:"type:text;" json:"bio"`
	CreatedAt            time.Time  `gorm:"default:now();type:timestamp with time zone" json:"created_at"`
	UpdatedAt            time.Time  `gorm:"default:now();type:timestamp with time zone" json:"updated_at"`
	LastLogin            *time.Time `gorm:"type:timestamp with time zone" json:"last_login"`
	IsActive             bool       `gorm:"default:true" json:"is_active"`
	IsAdmin              bool       `gorm:"default:false" json:"is_admin"`
	TwoFactorEnabled     bool       `gorm:"default:false" json:"two_factor_enabled"`
	TwoFactorSecret      string     `gorm:"type:varchar(255);" json:"two_factor_secret"`
	WalletAddress        string     `gorm:"type:varchar(255);" json:"wallet_address"`
	ResetToken           string     `gorm:"type:varchar(255);" json:"reset_token"`
	ResetTokenExpires    *time.Time `gorm:"type:timestamp with time zone" json:"reset_token_expires"`
}

// UserStats represents a player's statistics
type UserStats struct {
	ID                 uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID             uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`
	Level              int       `gorm:"default:1" json:"level"`
	Experience         int       `gorm:"default:0" json:"experience"`
	CryptoBalance      int       `gorm:"default:1000" json:"crypto_balance"`
	Reputation         int       `gorm:"default:0" json:"reputation"`
	MissionsCompleted  int       `gorm:"default:0" json:"missions_completed"`
	MissionsFailed     int       `gorm:"default:0" json:"missions_failed"`
	PvPWins            int       `gorm:"default:0" json:"pvp_wins"`
	PvPLosses          int       `gorm:"default:0" json:"pvp_losses"`
	AttackSuccessRate  int       `gorm:"default:0" json:"attack_success_rate"`
	DefenseSuccessRate int       `gorm:"default:0" json:"defense_success_rate"`
	TotalUpgrades      int       `gorm:"default:0" json:"total_upgrades"`
	CreatedAt          time.Time `gorm:"default:now()" json:"created_at"`
	UpdatedAt          time.Time `gorm:"default:now()" json:"updated_at"`
}

// Mission represents a hacking mission
type Mission struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Title        string    `gorm:"size:100;not null" json:"title"`
	Description  string    `gorm:"type:text;not null" json:"description"`
	Difficulty   string    `gorm:"size:20;not null" json:"difficulty"`
	Type         string    `gorm:"size:20;not null" json:"type"`
	BaseReward   int       `gorm:"not null" json:"base_reward"`
	TimeRequired int       `gorm:"not null" json:"time_required"`
	MinLevel     int       `gorm:"default:1" json:"min_level"`
	SuccessRate  int       `gorm:"default:70" json:"success_rate"`
	IsActive     bool      `gorm:"default:true" json:"is_active"`
	CreatedAt    time.Time `gorm:"default:now()" json:"created_at"`
	UpdatedAt    time.Time `gorm:"default:now()" json:"updated_at"`
}

// UserMission represents a mission undertaken by a user
type UserMission struct {
	ID               uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID           uuid.UUID  `gorm:"type:uuid;not null" json:"user_id"`
	MissionID        uuid.UUID  `gorm:"type:uuid;not null" json:"mission_id"`
	Status           string     `gorm:"size:20;not null" json:"status"`
	StartedAt        time.Time  `gorm:"default:now()" json:"started_at"`
	CompletedAt      *time.Time `json:"completed_at,omitempty"`
	RewardEarned     *int       `json:"reward_earned,omitempty"`
	ExperienceGained *int       `json:"experience_gained,omitempty"`
	
	// Relationships
	Mission          Mission    `gorm:"foreignKey:MissionID" json:"mission,omitempty"`
}

// Upgrade represents a system upgrade
type Upgrade struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name        string    `gorm:"size:100;not null" json:"name"`
	Description string    `gorm:"type:text;not null" json:"description"`
	Category    string    `gorm:"size:20;not null" json:"category"`
	BaseCost    int       `gorm:"not null" json:"base_cost"`
	MaxLevel    int       `gorm:"not null;default:5" json:"max_level"`
	CreatedAt   time.Time `gorm:"default:now()" json:"created_at"`
	UpdatedAt   time.Time `gorm:"default:now()" json:"updated_at"`
	
	// Relationships
	Effects     []UpgradeEffect `gorm:"foreignKey:UpgradeID" json:"effects,omitempty"`
}

// UserUpgrade represents an upgrade owned by a user
type UserUpgrade struct {
	ID             uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID         uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`
	UpgradeID      uuid.UUID `gorm:"type:uuid;not null" json:"upgrade_id"`
	Level          int       `gorm:"not null;default:1" json:"level"`
	PurchasedAt    time.Time `gorm:"default:now()" json:"purchased_at"`
	LastUpgradedAt time.Time `gorm:"default:now()" json:"last_upgraded_at"`
	
	// Relationships
	Upgrade        Upgrade    `gorm:"foreignKey:UpgradeID" json:"upgrade,omitempty"`
}

// UpgradeEffect represents the effect of an upgrade at a specific level
type UpgradeEffect struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UpgradeID   uuid.UUID `gorm:"type:uuid;not null" json:"upgrade_id"`
	Level       int       `gorm:"not null" json:"level"`
	EffectType  string    `gorm:"size:50;not null" json:"effect_type"`
	EffectValue int       `gorm:"not null" json:"effect_value"`
}

// SecuritySystem represents a security system
type SecuritySystem struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name        string    `gorm:"size:100;not null" json:"name"`
	Description string    `gorm:"type:text;not null" json:"description"`
	BaseCost    int       `gorm:"not null" json:"base_cost"`
	MaxLevel    int       `gorm:"not null;default:5" json:"max_level"`
	CreatedAt   time.Time `gorm:"default:now()" json:"created_at"`
	UpdatedAt   time.Time `gorm:"default:now()" json:"updated_at"`
}

// UserSecuritySystem represents a security system owned by a user
type UserSecuritySystem struct {
	ID               uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID           uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`
	SecuritySystemID uuid.UUID `gorm:"type:uuid;not null" json:"security_system_id"`
	Level            int       `gorm:"not null;default:1" json:"level"`
	Status           string    `gorm:"size:20;not null" json:"status"`
	Effectiveness    int       `gorm:"not null;default:50" json:"effectiveness"`
	PurchasedAt      time.Time `gorm:"default:now()" json:"purchased_at"`
	LastUpgradedAt   time.Time `gorm:"default:now()" json:"last_upgraded_at"`
	
	// Relationships
	SecuritySystem   SecuritySystem `gorm:"foreignKey:SecuritySystemID" json:"security_system,omitempty"`
}

// Vulnerability represents a security vulnerability in a user's system
type Vulnerability struct {
	ID          uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID      uuid.UUID  `gorm:"type:uuid;not null" json:"user_id"`
	Name        string     `gorm:"size:100;not null" json:"name"`
	Description string     `gorm:"type:text;not null" json:"description"`
	Risk        string     `gorm:"size:20;not null" json:"risk"`
	Status      string     `gorm:"size:20;not null" json:"status"`
	FixCost     int        `gorm:"not null" json:"fix_cost"`
	DetectedAt  time.Time  `gorm:"default:now()" json:"detected_at"`
	ResolvedAt  *time.Time `json:"resolved_at,omitempty"`
}

// PvPAttack represents an attack by one player on another
type PvPAttack struct {
	ID               uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	AttackerID       uuid.UUID `gorm:"type:uuid;not null" json:"attacker_id"`
	DefenderID       uuid.UUID `gorm:"type:uuid;not null" json:"defender_id"`
	Result           string    `gorm:"size:20;not null" json:"result"`
	CryptoStolen     int       `gorm:"default:0" json:"crypto_stolen"`
	ReputationChange int       `gorm:"default:0" json:"reputation_change"`
	AttackTimestamp  time.Time `gorm:"default:now()" json:"attack_timestamp"`
	
	// Relationships
	Attacker         User      `gorm:"foreignKey:AttackerID" json:"attacker,omitempty"`
	Defender         User      `gorm:"foreignKey:DefenderID" json:"defender,omitempty"`
}

// SecurityLog represents a security-related event
type SecurityLog struct {
	ID          uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID      uuid.UUID  `gorm:"type:uuid;not null" json:"user_id"`
	LogType     string     `gorm:"size:20;not null" json:"log_type"`
	Message     string     `gorm:"type:text;not null" json:"message"`
	Severity    string     `gorm:"size:20;not null" json:"severity"`
	IsResolved  bool       `gorm:"default:false" json:"is_resolved"`
	CreatedAt   time.Time  `gorm:"default:now()" json:"created_at"`
	ResolvedAt  *time.Time `json:"resolved_at,omitempty"`
}

// Transaction represents a cryptocurrency transaction
type Transaction struct {
	ID             uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID         uuid.UUID  `gorm:"type:uuid;not null" json:"user_id"`
	Amount         int        `gorm:"not null" json:"amount"`
	TransactionType string     `gorm:"size:50;not null" json:"transaction_type"`
	Description    string     `gorm:"type:text;not null" json:"description"`
	CreatedAt      time.Time  `gorm:"default:now()" json:"created_at"`
	ReferenceID    *uuid.UUID `json:"reference_id,omitempty"`
	ReferenceType  string     `gorm:"size:50" json:"reference_type,omitempty"`
}

// Notification represents a notification sent to a user
type Notification struct {
	ID               uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID           uuid.UUID  `gorm:"type:uuid;not null" json:"user_id"`
	Title            string     `gorm:"size:100;not null" json:"title"`
	Message          string     `gorm:"type:text;not null" json:"message"`
	NotificationType string     `gorm:"size:50;not null" json:"notification_type"`
	IsRead           bool       `gorm:"default:false" json:"is_read"`
	CreatedAt        time.Time  `gorm:"default:now()" json:"created_at"`
	ReadAt           *time.Time `json:"read_at,omitempty"`
}

// NotificationSettings represents a user's notification preferences
type NotificationSettings struct {
	ID                 uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID             uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`
	EmailNotifications bool      `gorm:"default:true" json:"email_notifications"`
	SecurityAlerts     bool      `gorm:"default:true" json:"security_alerts"`
	MarketingEmails    bool      `gorm:"default:false" json:"marketing_emails"`
	GameUpdates        bool      `gorm:"default:true" json:"game_updates"`
	CommunityMessages  bool      `gorm:"default:true" json:"community_messages"`
}

// Achievement represents an achievement that can be earned
type Achievement struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Title       string    `gorm:"size:100;not null" json:"title"`
	Description string    `gorm:"type:text;not null" json:"description"`
	Requirement string    `gorm:"type:text;not null" json:"requirement"`
	RewardAmount int       `gorm:"not null" json:"reward_amount"`
	CreatedAt   time.Time `gorm:"default:now()" json:"created_at"`
	UpdatedAt   time.Time `gorm:"default:now()" json:"updated_at"`
}

// UserAchievement represents an achievement earned by a user
type UserAchievement struct {
	ID           uuid.UUID  `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID       uuid.UUID  `gorm:"type:uuid;not null" json:"user_id"`
	AchievementID uuid.UUID  `gorm:"type:uuid;not null" json:"achievement_id"`
	Progress     int        `gorm:"default:0" json:"progress"`
	IsCompleted  bool       `gorm:"default:false" json:"is_completed"`
	CompletedAt  *time.Time `json:"completed_at,omitempty"`
	
	// Relationships
	Achievement   Achievement `gorm:"foreignKey:AchievementID" json:"achievement,omitempty"`
}

// Session represents a user session
type Session struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	UserID    uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`
	Token     string    `gorm:"size:255;not null;unique" json:"token"`
	IPAddress string    `gorm:"size:45" json:"ip_address,omitempty"`
	UserAgent string    `gorm:"type:text" json:"user_agent,omitempty"`
	CreatedAt time.Time `gorm:"default:now()" json:"created_at"`
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
	IsActive  bool      `gorm:"default:true" json:"is_active"`
}

// BeforeCreate will set a UUID rather than numeric ID for all models
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

func (u *UserStats) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

func (m *Mission) BeforeCreate(tx *gorm.DB) error {
	if m.ID == uuid.Nil {
		m.ID = uuid.New()
	}
	return nil
}

func (um *UserMission) BeforeCreate(tx *gorm.DB) error {
	if um.ID == uuid.Nil {
		um.ID = uuid.New()
	}
	return nil
}

func (u *Upgrade) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

func (uu *UserUpgrade) BeforeCreate(tx *gorm.DB) error {
	if uu.ID == uuid.Nil {
		uu.ID = uuid.New()
	}
	return nil
}

func (ue *UpgradeEffect) BeforeCreate(tx *gorm.DB) error {
	if ue.ID == uuid.Nil {
		ue.ID = uuid.New()
	}
	return nil
}

func (ss *SecuritySystem) BeforeCreate(tx *gorm.DB) error {
	if ss.ID == uuid.Nil {
		ss.ID = uuid.New()
	}
	return nil
}

func (uss *UserSecuritySystem) BeforeCreate(tx *gorm.DB) error {
	if uss.ID == uuid.Nil {
		uss.ID = uuid.New()
	}
	return nil
}

func (v *Vulnerability) BeforeCreate(tx *gorm.DB) error {
	if v.ID == uuid.Nil {
		v.ID = uuid.New()
	}
	return nil
}

func (pa *PvPAttack) BeforeCreate(tx *gorm.DB) error {
	if pa.ID == uuid.Nil {
		pa.ID = uuid.New()
	}
	return nil
}

func (sl *SecurityLog) BeforeCreate(tx *gorm.DB) error {
	if sl.ID == uuid.Nil {
		sl.ID = uuid.New()
	}
	return nil
}

func (t *Transaction) BeforeCreate(tx *gorm.DB) error {
	if t.ID == uuid.Nil {
		t.ID = uuid.New()
	}
	return nil
}

func (n *Notification) BeforeCreate(tx *gorm.DB) error {
	if n.ID == uuid.Nil {
		n.ID = uuid.New()
	}
	return nil
}

func (ns *NotificationSettings) BeforeCreate(tx *gorm.DB) error {
	if ns.ID == uuid.Nil {
		ns.ID = uuid.New()
	}
	return nil
}

func (a *Achievement) BeforeCreate(tx *gorm.DB) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	return nil
}

func (ua *UserAchievement) BeforeCreate(tx *gorm.DB) error {
	if ua.ID == uuid.Nil {
		ua.ID = uuid.New()
	}
	return nil
}

func (s *Session) BeforeCreate(tx *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return nil
}