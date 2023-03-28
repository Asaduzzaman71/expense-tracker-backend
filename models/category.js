const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
  class Category extends Model {
   
  }
  Category.init({
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    parentId: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
module.exports = Category;