# Horizons School Platform

This project is a comprehensive school management platform that includes:
- Public-facing website for Horizons School (to be implemented)
- Admin dashboard for managing school content (integrated in the backend)
- Backend API that serves both the website and admin dashboard

## Project Structure

```
ayoub-school/
└── horizons-school-backend/ # Backend API with integrated Admin Panel
    ├── src/                 # Source code
    │   ├── config/          # Configuration files
    │   ├── controllers/     # API controllers
    │   ├── middleware/      # Middleware functions
    │   ├── models/          # Database models
    │   ├── routes/          # API routes
    │   ├── scripts/         # Utility scripts
    │   └── server.js        # Main server file
    └── public/              # Static files
        ├── admin/           # Admin panel interface
        └── uploads/         # Uploaded files
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ayoub-school/horizons-school-backend
```

2. Install dependencies:
```bash
npm install
```

### Development Mode

To run the server in development mode:

```bash
npm run dev
```

This will start:
- Backend API on port 5000
- Admin dashboard at http://localhost:5000/admin

### Production Mode

To run the server in production mode:

```bash
npm start
```

## Admin Access

To create an admin user:

```bash
npm run create-admin
```

Default admin credentials:
- Email: admin@horizons-school.ma
- Password: Admin@123

## API Documentation

The API endpoints are available at `/api/v1/`:

- `/api/v1/auth` - Authentication endpoints
- `/api/v1/programs` - Programs management
- `/api/v1/news` - News management
- `/api/v1/contacts` - Contact form submissions
- `/api/v1/settings` - Site settings
- `/api/v1/team` - Team members management
- `/api/v1/stats` - Statistics 