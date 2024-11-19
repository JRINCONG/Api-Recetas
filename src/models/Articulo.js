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
    cantidad_restante: {
        type: DataTypes.INTEGER,
        allowNull: true,
        
    },
    cantidad_minima: {
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
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fecha_vencimiento:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    
    fecha_ingreso:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    imagen:{
        type:DataTypes.TEXT,
        allowNull:true,
    }
});

module.exports = Articulo;