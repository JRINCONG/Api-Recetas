const { getAll,Create ,AddIngrediente, getOne, Update,Delete  } = require('../controllers/receta.controllers');
const express = require('express');
const {verifyJWT} = require('../utils/verifyJWT')
const routerRecetas = express.Router();

routerRecetas.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, Create)


routerRecetas.route('/:id')
     .post(verifyJWT, AddIngrediente)
     .get(verifyJWT, getOne)
     .put(verifyJWT, Update)
     .delete(verifyJWT, Delete)    

module.exports = routerRecetas;