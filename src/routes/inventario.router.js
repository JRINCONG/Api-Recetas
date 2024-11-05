const { getAll } = require('../controllers/inventario.controllers');
const { cookieJWT } = require('../utils/cookieJWT')
const { verifyJWT } = require('../utils/verifyJWT')
const express = require('express');

const routerInventario = express.Router();

routerInventario.route('/')
    .get(verifyJWT, cookieJWT ,getAll)

module.exports = routerInventario;