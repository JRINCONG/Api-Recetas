const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Articulo = sequelize.define('articulo', {
    items: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    tipo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    unidad_M: {
        type: DataTypes.STRING,
        allowNull: false
    },
    costo_unitario: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fecha_vencimiento:{
        type:DataTypes.DATE,
        allowNull:false
    },
    
    fecha_ingreso:{
        type:DataTypes.DATE,
        allowNull:false
    }
});

module.exports = Articulo;