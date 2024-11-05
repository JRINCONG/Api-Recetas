const express = require('express');
const routerUser = require('./user.router');
const routerRecetas = require('./receta.router')
const routerArticulo = require('./articulo.router')
const routerProveedor = require('./proveedor.router')
const routerInventario = require('./inventario.router')
const routerPreparacion = require('./preparacion.router')
const router = express.Router();


// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/recetas', routerRecetas)
router.use('/articulos', routerArticulo)
router.use('/proveedor', routerProveedor)
router.use('/inventarios', routerInventario)
router.use('/preparacion', routerPreparacion)


module.exports = router;