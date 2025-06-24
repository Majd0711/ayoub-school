const http = require('http');

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          console.log('Raw response:', responseData);
          const parsedData = JSON.parse(responseData);
          resolve(parsedData);
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
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAuth() {
  try {
    console.log('Testing login endpoint...');
    console.log('Sending request to:', {
      hostname: 'localhost',
      port: 5000,
      path: '/api/v1/auth/login',
      method: 'POST',
      data: {
        email: 'admin@horizons-school.ma',
        password: 'Admin@123'
      }
    });

    const loginData = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/v1/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, {
      email: 'admin@horizons-school.ma',
      password: 'Admin@123'
    });

    console.log('Login response:', loginData);

    if (loginData.token) {
      console.log('\nTesting profile endpoint...');
      const profileData = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/auth/profile',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Profile response:', profileData);
    }
  } catch (error) {
    console.error('Test error:', error);
    console.error('Error stack:', error.stack);
  }
}

testAuth(); 