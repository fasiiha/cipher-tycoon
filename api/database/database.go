package database

import (
	"log"
	"os"

	"github.com/fasiiha/hacker-tycoon/api/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// InitDB initializes the database connection
func InitDB() {

	// dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
	// 	os.Getenv("DB_HOST"),
	// 	os.Getenv("DB_PORT"),
	// 	os.Getenv("DB_USER"),
	// 	os.Getenv("DB_PASSWORD"),
	// 	os.Getenv("DB_NAME"),
	// 	os.Getenv("DB_SSL_MODE"),
	// )
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatalf("DATABASE_URL environment variable not set")
	}
	
	var err error
	DB, err = gorm.Open(postgres.Open(databaseURL), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	log.Println("Connected to database successfully")

	// Auto migrate the schema
	migrateDB()
}

// CloseDB closes the database connection
func CloseDB() {
	sqlDB, err := DB.DB()
	if err != nil {
		log.Printf("Error getting DB instance: %v", err)
		return
	}
	
	if err := sqlDB.Close(); err != nil {
		log.Printf("Error closing database connection: %v", err)
	}
}

// migrateDB performs database migrations
func migrateDB() {
	log.Println("Running database migrations...")
	
	// Auto migrate all models
	err := DB.AutoMigrate(
		&models.User{},
		&models.UserStats{},
		&models.Mission{},
		&models.UserMission{},
		&models.Upgrade{},
		&models.UserUpgrade{},
		&models.UpgradeEffect{},
		&models.SecuritySystem{},
		&models.UserSecuritySystem{},
		&models.Vulnerability{},
		&models.PvPAttack{},
		&models.SecurityLog{},
		&models.Transaction{},
		&models.Notification{},
		&models.NotificationSettings{},
		&models.Achievement{},
		&models.UserAchievement{},
		&models.Session{},
	)
	
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
	
	log.Println("Database migrations completed successfully")
}