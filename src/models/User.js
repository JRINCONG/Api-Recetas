const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    first_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_Name: {
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
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:true
    }
});

module.exports = User;