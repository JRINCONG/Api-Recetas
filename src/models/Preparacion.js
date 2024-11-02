const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Preparation = sequelize.define('preparation', {
    nombre_receta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    catidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = Preparation;