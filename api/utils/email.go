package utils

import (
	"fmt"
	"net/smtp"
	"os"
)

// EmailData represents the data needed to send an email
type EmailData struct {
	To      string
	Subject string
	Body    string
}

// SendEmail sends an email using the configured SMTP server
func SendEmail(data EmailData) error {
	// Get SMTP configuration from environment
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpUsername := os.Getenv("SMTP_USERNAME")
	smtpPassword := os.Getenv("SMTP_PASSWORD")
	smtpFrom := os.Getenv("SMTP_FROM")

	// Create authentication
	auth := smtp.PlainAuth("", smtpUsername, smtpPassword, smtpHost)

	// Compose email
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	subject := fmt.Sprintf("Subject: %s\n", data.Subject)
	from := fmt.Sprintf("From: %s\n", smtpFrom)
	to := fmt.Sprintf("To: %s\n", data.To)
	msg := []byte(subject + from + to + mime + "\n" + data.Body)

	// Send email
	addr := smtpHost + ":" + smtpPort
	err := smtp.SendMail(addr, auth, smtpFrom, []string{data.To}, msg)
	if err != nil {
		return err
	}

	return nil
}

// SendPasswordResetEmail sends a password reset email
func SendPasswordResetEmail(email, code string) error {
	// Create email data
	data := EmailData{
		To:      email,
		Subject: "Hacker Tycoon - Password Reset",
		Body: fmt.Sprintf(`
			<html>
			<body style="font-family: Arial, sans-serif; color: #333;">
				<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
					<h2 style="color: #00cc00;">Hacker Tycoon - Password Reset</h2>
					<p>You have requested to reset your password. Use the following verification code to complete the process:</p>
					<div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
						%s
					</div>
					<p>This code will expire in 15 minutes.</p>
					<p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
					<p>Regards,<br>The Hacker Tycoon Team</p>
				</div>
			</body>
			</html>
		`, code),
	}

	// Send email
	return SendEmail(data)
}

// SendWelcomeEmail sends a welcome email to a new user
func SendWelcomeEmail(email, username string) error {
	// Create email data
	data := EmailData{
		To:      email,
		Subject: "Welcome to Hacker Tycoon!",
		Body: fmt.Sprintf(`
			<html>
			<body style="font-family: Arial, sans-serif; color: #333;">
				<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
					<h2 style="color: #00cc00;">Welcome to Hacker Tycoon!</h2>
					<p>Hello %s,</p>
					<p>Thank you for joining Hacker Tycoon - The Dark Web Challenge! Your account has been successfully created.</p>
					<p>Get ready to build your hacking empire, complete missions, and compete with players worldwide in this immersive hacking simulation game.</p>
					<p>To get started, log in to your account and check out the available missions.</p>
					<p>Regards,<br>The Hacker Tycoon Team</p>
				</div>
			</body>
			</html>
		`, username),
	}

	// Send email
	return SendEmail(data)
}