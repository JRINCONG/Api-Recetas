const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
       
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
      
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = User;