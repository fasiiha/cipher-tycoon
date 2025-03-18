package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"ciphertycoon/api/database"
	"ciphertycoon/api/routes"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ Warning: No .env file found")
	}

	// Connect to DB and apply migrations
	database.ConnectDB()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r := mux.NewRouter()
	routes.RegisterAuthRoutes(r)

	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"}, 
		AllowedHeaders: []string{"Content-Type", "Authorization"}, 
	}).Handler(r)

	fmt.Println("🚀 Server running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
