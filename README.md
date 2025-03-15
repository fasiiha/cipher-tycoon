# Cipher Tycoon - The Dark Web Challenge

## Overview

Cipher Tycoon is a text-based hacking simulation game where players take on various hacking missions, earn virtual cryptocurrency, upgrade their hacking tools, and compete on leaderboards. Built using **Next.js** for the frontend, **Golang** for the backend, and **Supabase** as the database, this game is designed to be simple, interactive, and backend-focused.

## Features

- **User Authentication**: GitHub OAuth login using Supabase.
- **Mission System**: Players can take on hacking missions and earn virtual currency.
- **Database Integration**: User data, missions, and leaderboards are stored in Supabase.
- **Real-Time Updates**: Fetch and update data dynamically.
- **Leaderboard**: Display top hackers based on earnings.

## Tech Stack

- **Frontend**: Next.js (React, Tailwind CSS for styling)
- **Backend**: Golang (Gin or Fiber framework)
- **Database**: Supabase (PostgreSQL, real-time subscriptions)
- **Authentication**: Supabase Auth (GitHub OAuth)
- **State Management**: React hooks

## Folder Structure

```
/cipher-tycoon
 ├── /frontend           # Next.js frontend
 │    ├── /components       # Reusable UI components
 │    ├── /pages            # Next.js pages
 │    ├── /styles           # CSS styles (Tailwind)
 │    ├── package.json      # Frontend dependencies
 ├── /api            # Golang backend
 │    ├── /handlers         # API handlers
 │    ├── /models           # Data models
 │    ├── /routes           # API routes
 │    ├── /main.go          # Main server entry point
 ├── /database           # Supabase setup
 ├── .env.local          # Environment variables (Supabase credentials)
 ├── README.md           # Documentation
```

## Installation & Setup

### Prerequisites

- Node.js installed
- Golang installed
- Supabase account & project setup

### 1. Clone the Repository

```bash
git clone https://github.com/fasiiha/cipher-tycoon.git
cd cipher-tycoon
```

### 2. Setup Backend (Golang)

```bash
cd backend
 go mod tidy
 go run main.go
```

### 3. Setup Frontend (Next.js)

```bash
cd frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the frontend folder and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a `.env` file in the backend folder and add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_service_role_key
```

### 5. Run the Development Server

#### Start Backend

```bash
cd backend
 go run main.go
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to play the game.

## Future Enhancements

- Add real-time player-vs-player (PvP) hacking battles.
- Implement in-game purchases (crypto-based economy).
- Introduce AI-based hacking challenges.
- Improve UI with animations and better styling.

## License

This project is open-source and available under the **MIT License**.

## Contributions

Contributions are welcome! Feel free to submit a PR or open an issue.

## Contact

For any queries, reach out to [fasihaa.arshad@example.com] or create an issue on GitHub.

---

Happy Hacking! 🚀
