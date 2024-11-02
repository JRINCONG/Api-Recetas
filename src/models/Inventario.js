const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Inventario = sequelize.define('inventario', {
    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    cantidad_disponible: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unidad: {
        type: DataTypes.INTEGER,
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