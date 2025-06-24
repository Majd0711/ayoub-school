const path = require('path');
const { spawn } = require('child_process');

// Path to server.js
const serverPath = path.join(__dirname, '..', 'server.js');

console.log(`Starting server from: ${serverPath}`);

// Spawn a new process for the server
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  shell: true
});

// Listen for errors
server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

// Listen for exit
server.on('exit', (code, signal) => {
  if (code) {
    console.error(`Server process exited with code ${code}`);
  } else if (signal) {
    console.error(`Server process killed with signal ${signal}`);
  } else {
    console.log('Server stopped');
  }
});

console.log('Server process started. Press Ctrl+C to stop.'); 