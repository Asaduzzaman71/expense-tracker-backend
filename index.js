//external imports
require('dotenv').config();
require('express-async-errors');
const multer = require("multer");
const http = require('http');
const express = require('express');
var cookieParser = require('cookie-parser');
const socketIo = require('socket.io');
const app = express();
const sequelize = require('./config/database');

//internal imports

const authRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const { authenticateUser, authorizePermissions } = require('./middleware/authentication');


// Add this line to parse JSON request bodies
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

//all api routes
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up your WebSocket (socket.io) logic here
const io = socketIo(server);
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });
});


//get port number from env
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
      await sequelize.authenticate()
      console.log('Connection has been established successfully.');
      server.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();