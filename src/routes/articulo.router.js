const { getAll, Create } = require('../controllers/articulo.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT')
const routerArticulo = express.Router();

routerArticulo.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, Create)

module.exports = routerArticulo;