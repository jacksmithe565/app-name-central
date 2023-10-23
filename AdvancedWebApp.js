/*
Filename: AdvancedWebApp.js
Description: This code demonstrates an advanced web application that includes features like user authentication, database operations, and real-time chat functionality.
*/

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const socketIO = require('socket.io');

// Initialize Express app
const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User schema for MongoDB
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Parse request body as JSON
app.use(express.json());

// User registration route
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login route
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username, email: user.email }, 'secret-key');
  res.json({ token });
});

// Protected route
app.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.json({ message: 'You have accessed a protected route', user: decoded });
  });
});

// Start the server
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Initialize Socket.IO
const io = socketIO(server);

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('message', (data) => {
    // Perform database operations here, e.g. saving the message to MongoDB
    console.log('Received message:', data);
    io.emit('message', data); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
  });
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});

// More code...
// ...
// ...

// ...
// More code...
// ...

// ...
// More code...
// ...

// ...
// More code...
// ...

// ...
// More code...
// ...

// End of the code