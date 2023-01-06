require('dotenv').config();
require('express-async-errors');
const multer = require("multer");
const express = require('express');

var cookieParser = require('cookie-parser');

const app = express();

const sequelize = require('./config/database');
const authRouter = require('./routes/userRoute');


const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const {authenticateUser,authorizePermissions} = require('./middleware/authentication');

// middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/auth', authRouter);


app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // connectDB
    await sequelize.authenticate()
      console.log('Connection has been established successfully.');
      app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();