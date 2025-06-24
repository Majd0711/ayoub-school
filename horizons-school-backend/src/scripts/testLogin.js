const http = require('http');

// Function to make an HTTP request
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          console.log(`Response status: ${res.statusCode}`);
          console.log('Response headers:', res.headers);
          console.log('Raw response:', responseData);
          
          const parsedData = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: parsedData });
        } catch (error) {
          console.error('Error parsing response:', error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    if (data) {
      const stringData = JSON.stringify(data);
      req.setHeader('Content-Type', 'application/json');
      req.setHeader('Content-Length', Buffer.byteLength(stringData));
      req.write(stringData);
    }
    
    req.end();
  });
}

async function testLogin() {
  try {
    console.log('Testing login with admin@horizons-school.ma / Admin@123');
    
    const loginResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/v1/auth/login',
      method: 'POST',
    }, {
      email: 'admin@horizons-school.ma',
      password: 'Admin@123'
    });

    console.log('Login response:', loginResponse);

    if (loginResponse.data.token) {
      console.log('\nTesting profile endpoint with token');
      
      const profileResponse = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/auth/profile',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginResponse.data.token}`
        }
      });

      console.log('Profile response:', profileResponse);
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testLogin(); 