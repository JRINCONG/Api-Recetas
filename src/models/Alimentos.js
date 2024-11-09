const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Alimento = sequelize.define('alimento', {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Alimento;