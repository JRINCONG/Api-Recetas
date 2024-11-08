const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Inventario = sequelize.define('inventario', {
    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    cantidad_disponible: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    unidad: {
        type: DataTypes.STRING,
        allowNull: false
    },

    estado:{
        type:DataTypes.STRING,
        allowNull:true
    },

    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
  


});

module.exports = Inventario;