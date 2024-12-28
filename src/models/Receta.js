const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Receta = sequelize.define('receta', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    T_preparacion: {
        type: DataTypes.TIME,
        allowNull: false
    },
    T_coccion: {
        type: DataTypes.TIME,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    video: {
        type: DataTypes.TEXT,
        allowNull: false
    },
   
});

module.exports = Receta;