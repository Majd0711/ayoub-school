# Connecting to MongoDB Atlas

This guide will help you connect your Horizons School application to MongoDB Atlas.

## Connection Details

The application is configured to connect to MongoDB Atlas with the following connection string:
```
mongodb+srv://contactmajde:momimomi1967@horizons-school.teub1zh.mongodb.net/horizons-school
```

## How to Start the Server with MongoDB Atlas

### Option 1: Using the .env File (Recommended)

1. Run the setup environment script:
   ```bash
   npm run setup-env
   ```

2. Start the server:
   ```bash
   npm start
   ```

### Option 2: Using the Atlas Script

Start the server with MongoDB Atlas connection:
```bash
npm run start-atlas
```

For development with automatic restart:
```bash
npm run dev-atlas
```

## Verifying Connection

When the server starts successfully with MongoDB Atlas connection, you should see this message in the console:

```
MongoDB Atlas Connected: horizons-school-shard-00-00.teub1zh.mongodb.net
```

## Troubleshooting

1. **Network Issues**: Ensure your IP address is whitelisted in MongoDB Atlas Network Access settings.

2. **Database Name**: The connection string includes the database name `horizons-school`. If you need to use a different database name, update it in the connection string.

3. **Authentication Failed**: If you see authentication errors, the password might have been changed. Contact the database administrator for the updated credentials. 