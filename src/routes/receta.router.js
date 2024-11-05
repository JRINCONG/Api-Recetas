const { getAll,Create ,AddIngrediente, getOne, Update,Delete  } = require('../controllers/receta.controllers');
const express = require('express');
const {verifyJWT} = require('../utils/verifyJWT')
const { cookieJWT } = require('../utils/cookieJWT')
const routerRecetas = express.Router();

routerRecetas.route('/')
    .get(verifyJWT, cookieJWT, getAll)
    .post(verifyJWT, cookieJWT, Create)


routerRecetas.route('/:id')
     .post(verifyJWT, cookieJWT, AddIngrediente)
     .get(verifyJWT, cookieJWT, getOne)
     .put(verifyJWT, cookieJWT, Update)
     .delete(verifyJWT, cookieJWT, Delete)    

module.exports = routerRecetas;