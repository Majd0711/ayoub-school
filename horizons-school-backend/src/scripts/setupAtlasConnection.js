/**
 * MongoDB Atlas Connection Setup Guide
 * 
 * The connection is failing because your IP address is not whitelisted in MongoDB Atlas.
 * Follow these steps to configure your MongoDB Atlas account:
 * 
 * 1. Login to MongoDB Atlas: https://cloud.mongodb.com
 * 
 * 2. Select your project and cluster "horizons-school"
 * 
 * 3. Click on "Network Access" in the left sidebar
 * 
 * 4. Click the "ADD IP ADDRESS" button
 * 
 * 5. For development purposes, you can click "ALLOW ACCESS FROM ANYWHERE" 
 *    (This adds 0.0.0.0/0 to your IP whitelist)
 *    OR
 *    Click "ADD CURRENT IP ADDRESS" to only allow your current IP
 * 
 * 6. Click "Confirm"
 * 
 * 7. Wait for the changes to be applied (usually takes about 1-2 minutes)
 * 
 * 8. Run the test connection script again:
 *    npm run test-atlas
 * 
 * 9. Once the connection is successful, you can start the server:
 *    npm run start-atlas
 */

console.log(`
=======================================================================
MongoDB Atlas Connection Setup Guide
=======================================================================

The connection is failing because your IP address is not whitelisted in MongoDB Atlas.
Follow these steps to configure your MongoDB Atlas account:

1. Login to MongoDB Atlas: https://cloud.mongodb.com

2. Select your project and cluster "horizons-school"

3. Click on "Network Access" in the left sidebar

4. Click the "ADD IP ADDRESS" button

5. For development purposes, you can click "ALLOW ACCESS FROM ANYWHERE" 
   (This adds 0.0.0.0/0 to your IP whitelist)
   OR
   Click "ADD CURRENT IP ADDRESS" to only allow your current IP

6. Click "Confirm"

7. Wait for the changes to be applied (usually takes about 1-2 minutes)

8. Run the test connection script again:
   npm run test-atlas

9. Once the connection is successful, you can start the server:
   npm run start-atlas
=======================================================================
`);

// Attempt to get the current IP address
const https = require('https');

console.log('Attempting to detect your current public IP address...');

https.get('https://api.ipify.org', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Your current public IP address appears to be: ${data}`);
    console.log('You should whitelist this IP address in MongoDB Atlas Network Access settings.');
  });
}).on('error', (err) => {
  console.log('Could not detect your IP address automatically.');
  console.log('Please visit https://whatismyipaddress.com/ to find your public IP address.');
}); 