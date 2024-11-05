const { getAll, Create } = require('../controllers/proveedor.controllers');
const { verifyJWT } = require('../utils/verifyJWT')
const { cookieJWT } = require('../utils/cookieJWT')
const express = require('express');

const routerProveedor = express.Router();

routerProveedor.route('/')
    .get(verifyJWT, cookieJWT, getAll)
    .post(verifyJWT, cookieJWT, Create)

module.exports = routerProveedor;