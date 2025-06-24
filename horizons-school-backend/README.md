# Horizons School Management System

This is a management system for Horizons School, consisting of a backend API and an admin panel.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/horizons-school
   JWT_SECRET=your-secret-key
   ```

### Running the Application

Start the server:
```
npm run start
```

The server will run on http://localhost:5000

## Features

- **Admin Panel**: Access the admin panel at http://localhost:5000/admin
- **API Endpoints**: Access the API at http://localhost:5000/api/v1/

## Admin Login

Default admin credentials:
- Email: admin@horizons-school.ma
- Password: Admin@123

## API Endpoints

### Authentication
- POST /api/v1/auth/login - Login
- GET /api/v1/auth/profile - Get user profile
- POST /api/v1/auth/logout - Logout

### Programs
- GET /api/v1/programs - Get all programs
- GET /api/v1/programs/:id - Get a program by ID
- POST /api/v1/programs - Create a new program
- PUT /api/v1/programs/:id - Update a program
- DELETE /api/v1/programs/:id - Delete a program

### News
- GET /api/v1/news - Get all news
- GET /api/v1/news/:id - Get a news by ID
- POST /api/v1/news - Create a new news
- PUT /api/v1/news/:id - Update a news
- DELETE /api/v1/news/:id - Delete a news

### Contacts
- GET /api/v1/contacts - Get all contacts
- POST /api/v1/contacts - Create a new contact

### Team
- GET /api/v1/team - Get all team members
- GET /api/v1/team/:id - Get a team member by ID
- POST /api/v1/team - Create a new team member
- PUT /api/v1/team/:id - Update a team member
- DELETE /api/v1/team/:id - Delete a team member

### Settings
- GET /api/v1/settings - Get all settings
- PUT /api/v1/settings - Update settings

## Utility Scripts

- **Create Admin**: Create a new admin user
  ```
  node src/scripts/createAdmin.js
  ```

- **Reset Admin**: Reset the admin user to default
  ```
  node src/scripts/resetAdmin.js
  ```

- **Test Login**: Test the login functionality
  ```
  node src/scripts/testLogin.js
  ``` 