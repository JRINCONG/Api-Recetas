const { getAll, getBelowQuantity, ArticulosVencidos } = require('../controllers/inventario.controllers');
const { cookieJWT } = require('../utils/cookieJWT')
const { verifyJWT } = require('../utils/verifyJWT')
const express = require('express');

const routerInventario = express.Router();

routerInventario.route('/')
    .get(verifyJWT, cookieJWT ,getAll)





routerInventario.route('/estado')
       .get(verifyJWT, cookieJWT, getBelowQuantity)
       .post(verifyJWT, cookieJWT, ArticulosVencidos)    

module.exports = routerInventario;