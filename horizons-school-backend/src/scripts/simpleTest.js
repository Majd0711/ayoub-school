const http = require('http');

// Test the API connection
const testApi = () => {
  console.log('Testing API connection to: http://localhost:5000/api/v1/auth/login');
  
  // Create the request data
  const data = JSON.stringify({
    email: 'admin@horizons-school.ma',
    password: 'Admin@123'
  });
  
  console.log('Request data:', data);
  
  // Set up the request options
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  
  console.log('Sending request with options:', options);
  
  // Create the request
  const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Response headers:', res.headers);
    
    let responseData = '';
    
    res.on('data', (chunk) => {
      console.log('Received chunk of data');
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('Response completed');
      try {
        console.log('Raw response:', responseData);
        const parsedData = JSON.parse(responseData);
        console.log('Parsed response:', parsedData);
        
        if (parsedData.success && parsedData.token) {
          console.log('Login successful! Token received.');
          console.log('User:', parsedData.user);
        } else {
          console.log('Login failed:', parsedData.message);
        }
      } catch (e) {
        console.error('Error parsing response:', e);
        console.log('Raw response:', responseData);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('Error testing API:', error);
  });
  
  // Send the request
  req.write(data);
  req.end();
  console.log('Request sent');
};

// Run the test
testApi();

// Keep the process alive for a bit to ensure the request completes
setTimeout(() => {
  console.log('Test completed');
}, 5000); 