const { getAll, Create } = require('../controllers/preparacion.controllers');
const { verifyJWT } = require('../utils/verifyJWT')
const { cookieJWT } = require('../utils/cookieJWT')
const express = require('express');

const routerPreparacion = express.Router();

routerPreparacion.route('/')
    .get(verifyJWT, cookieJWT, getAll)
    .post(verifyJWT, cookieJWT,Create)

module.exports = routerPreparacion;