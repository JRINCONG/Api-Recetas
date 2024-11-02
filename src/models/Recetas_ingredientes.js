const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Recetas_Ingrediente = sequelize.define('Recetas_Ingrediente', {
    items: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Recetas_Ingrediente;