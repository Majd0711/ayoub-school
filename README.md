# Horizons School Website and Admin Panel

This project consists of a front-end website for Horizons School and an admin panel to manage the content displayed on the website.

## Project Structure

- `horizons-school/` - Front-end React application
- `horizons-school-backend/` - Backend Node.js/Express API

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd ayoub-school
```

### 2. Install dependencies

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all
```

### 3. Configure environment variables

Create `.env` files in both the frontend and backend directories:

**horizons-school/.env**
```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

**horizons-school-backend/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/horizons-school
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Start the development servers

```bash
# Start both frontend and backend in development mode
npm run dev

# Or start them separately
npm run dev:backend
npm run dev:frontend
```

## Admin Panel Access

- URL: http://localhost:5000/admin
- Default credentials:
  - Email: admin@horizons-school.ma
  - Password: Admin@123

## Features

### Front-end Website
- Home page with featured programs
- Programs listing page with filtering by category
- About page with school information
- News and events page
- Contact page with form submission

### Admin Panel
- Authentication and user management
- Dashboard with statistics
- Program management (create, read, update, delete)
- News management
- Team member management
- Contact form submissions
- Site settings

## API Documentation

### Authentication
- `POST /api/v1/auth/login` - Login with email and password
- `GET /api/v1/auth/profile` - Get current user profile

### Programs
- `GET /api/v1/programs` - Get all programs
- `GET /api/v1/programs/:id` - Get a specific program
- `POST /api/v1/programs` - Create a new program (requires authentication)
- `PUT /api/v1/programs/:id` - Update a program (requires authentication)
- `DELETE /api/v1/programs/:id` - Delete a program (requires authentication)

### News
- `GET /api/v1/news` - Get all news articles
- `GET /api/v1/news/:id` - Get a specific news article
- `POST /api/v1/news` - Create a news article (requires authentication)
- `PUT /api/v1/news/:id` - Update a news article (requires authentication)
- `DELETE /api/v1/news/:id` - Delete a news article (requires authentication)

### Contacts
- `GET /api/v1/contacts` - Get all contact submissions (requires authentication)
- `POST /api/v1/contacts` - Submit a contact form

## License

This project is licensed under the ISC License. 