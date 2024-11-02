const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Pedido = sequelize.define('pedido', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detalle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Pedido;