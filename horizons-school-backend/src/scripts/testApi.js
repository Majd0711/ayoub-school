const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';

async function testNewsApi() {
  try {
    console.log(`Testing news API at: ${API_URL}/news`);
    
    // Use the built-in fetch API
    const { default: fetch } = await import('node-fetch');
    
    const response = await fetch(`${API_URL}/news`);
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log(`Found ${data.count} news items`);
      
      if (data.data && data.data.length > 0) {
        console.log('First news item:', JSON.stringify(data.data[0], null, 2));
      } else {
        console.log('No news items found in the response data');
      }
    } else {
      console.log('API returned success: false');
    }
  } catch (error) {
    console.error('Error testing news API:', error);
  }
}

// Run the test
testNewsApi(); 