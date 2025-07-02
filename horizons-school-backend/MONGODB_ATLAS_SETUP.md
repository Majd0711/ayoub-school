# MongoDB Atlas Connection Guide

This guide provides instructions on how to connect your Horizons School application to MongoDB Atlas.

## Connection Details

The application is configured to connect to MongoDB Atlas with the following connection string:
```
mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority
```

## Setup Steps

### 1. Whitelist Your IP Address

The most common reason for connection failures is that your IP address is not whitelisted in MongoDB Atlas:

1. Login to MongoDB Atlas: https://cloud.mongodb.com
2. Select your project and cluster
3. Click on "Network Access" in the left sidebar
4. Click the "ADD IP ADDRESS" button
5. For development purposes, you can click "ALLOW ACCESS FROM ANYWHERE" (adds 0.0.0.0/0)
   OR click "ADD CURRENT IP ADDRESS" to only allow your current IP
6. Click "Confirm"
7. Wait for the changes to be applied (usually takes about 1-2 minutes)

Your current IP address appears to be: **41.141.58.45**

### 2. Test the Connection

We've provided several ways to test the MongoDB Atlas connection:

#### Browser Test (Recommended)
```bash
npm run simple-server
```
Then open http://localhost:3030 in your browser to see the connection status.

#### Command Line Tests
```bash
npm run test-atlas   # Test using Mongoose
npm run test-mongo   # Test using MongoDB driver
```

### 3. Start the Server with MongoDB Atlas

Once the connection is working, you can start the server with:

```bash
npm run start-atlas
```

For development with automatic restart:
```bash
npm run dev-atlas
```

## Troubleshooting

### TLS/SSL Issues

If you're experiencing TLS/SSL errors, try these solutions:

1. **Update Node.js**: Make sure you're using a recent version of Node.js
2. **Network Restrictions**: Some networks block certain outbound connections
3. **Try a VPN**: If your network restricts connections, try using a VPN
4. **Check Firewall Settings**: Ensure your firewall allows outbound connections on port 27017

### Authentication Issues

If you see authentication errors:

1. **Verify Credentials**: Double-check the username and password
2. **Database User**: Make sure the user "contactmajde" has the appropriate permissions
3. **Auth Database**: The user might be associated with a specific authentication database

### Cluster Issues

1. **Cluster Status**: Check if the cluster is active in MongoDB Atlas dashboard
2. **Region**: Ensure the cluster region doesn't have any outages

## Manual Connection Test

You can also test the connection manually using the MongoDB shell:

1. Download and install MongoDB Shell: https://www.mongodb.com/try/download/shell
2. Run the following command:
   ```
   mongosh "mongodb+srv://s.4obmcmw.mongodb.net/horizons-school" --username contactmajde --password DRJADyNhNV0N5iA5
   ```

## Need Further Help?

If you continue to experience connection issues:

1. Check the MongoDB Atlas status page: https://status.mongodb.com/
2. Contact MongoDB Atlas support
3. Try connecting from a different network or device 