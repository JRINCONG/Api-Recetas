const User = require('./User')
const Recetas_ingredientes =require('./Recetas_ingredientes')
const Recetas = require('./Receta')
const Articulos = require('./Articulo')
const Pedidos = require('./Pedidos')
const Proveedores = require('./Proveedor')
const Preparacion = require('./Preparacion')
const Inventarios = require('./Inventario')




Recetas_ingredientes.belongsTo(Recetas)
Recetas.hasMany(Recetas_ingredientes)

Recetas_ingredientes.belongsTo(Articulos)
Articulos.hasMany(Recetas_ingredientes)

Articulos.belongsTo(Proveedores)
Proveedores.hasMany(Articulos)

Inventarios.belongsTo(Articulos)
Articulos.hasMany(Inventarios)

Articulos.belongsTo(User)
User.hasMany(Articulos)

Preparacion.belongsTo(Recetas)
Recetas.hasMany(Preparacion)

Preparacion.belongsTo(User)
User.hasMany(Preparacion)

Pedidos.belongsTo(Proveedores)
Proveedores.hasMany(Pedidos)

Pedidos.belongsTo(User)
User.hasMany(Pedidos)

Inventarios.belongsTo(User)
User.hasMany(Inventarios)
