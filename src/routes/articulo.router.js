const { getAll, Create, Update } = require('../controllers/articulo.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT')
const { cookieJWT } = require('../utils/cookieJWT')
const routerArticulo = express.Router();

routerArticulo.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, Create)
   


routerArticulo.route('/:id')
     .put(verifyJWT, Update)
     


module.exports = routerArticulo;