const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Proveedor = sequelize.define('provedore', {
    razon_social: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nit: {
        type: DataTypes.TEXT,
        allowNull: false
    },
     email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
     

    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Proveedor;