const express = require('express');
const routerUser = require('./user.router');
const routerRecetas = require('./receta.router')
const routerArticulo = require('./articulo.router')
const router = express.Router();


// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/recetas', routerRecetas)
router.use('/articulos', routerArticulo)


module.exports = router;