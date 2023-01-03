
const Sequelize = require('sequelize');
const db = require('../config/database');

    const User = db.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique:true,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM("superadmin", "admin", "user"),
            allowNull: false
        }
    });
  
    module.exports =  User;

