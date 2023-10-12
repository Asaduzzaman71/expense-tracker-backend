const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
  class Expense extends Model {
   
  }
  Expense.init({
      title: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
  }, {
    sequelize,
    modelName: 'Expense',
  });
module.exports = Expense;