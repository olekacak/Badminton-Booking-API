# Badminton Court Booking API

A Node.js-based API for booking badminton courts. This project provides endpoints to manage court reservations, users, and availability using a local SQLite database.

## 🛠 Requirements

- Node.js (v14 or later)
- npm

## 🚀 Setup Instructions

1. **Clone the Repository**

```bash
git clone <your-repo-url>
cd badminton-court-booking-api
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Variables**

Copy the example environment file or configure it:

```bash
cp env/local.env .env
```

Or manually create a `.env` file with the required variables.

4. **Start the Development Server**

```bash
npm run dev
```

The server should now be running on the port specified in your `.env` file (commonly `localhost:3000`).

## 🧾 Scripts

- `npm run dev` – Starts the server with auto-restart using `nodemon`.

## 🗃 Database

The project uses a local SQLite database (`booking.db`). You can inspect or modify it using any SQLite-compatible tool.

## 📁 Project Structure

```
Badminton Court Booking API/
│
├── booking.db               # SQLite database
├── env/                     # Environment configuration
├── node_modules/            # Dependencies
├── package.json             # Project metadata and scripts
├── .gitignore
└── README.md
```

## 📬 API Endpoints

Documentation for the API routes can be added here or served with tools like Swagger or Postman collections.

---

Happy coding! 🏸
