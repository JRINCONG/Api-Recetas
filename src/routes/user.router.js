const { getAll, Create, Login } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJWT} = require('../utils/verifyJWT')
const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT, getAll)
    .post(Create)
    
routerUser.route('/login')
      .post(Login)
module.exports = routerUser;