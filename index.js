//external imports
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const sequelize = require('./config/database');

//internal imports

const expenseRouter = require('./routes/expenseRoute');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


// Add this line to parse JSON request bodies
app.use(express.json());

//all api routes
app.use('/api/expenses', expenseRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

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