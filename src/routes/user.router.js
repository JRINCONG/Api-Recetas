const { getAll, Create, Login, Logged, Update } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJWT} = require('../utils/verifyJWT')
const { cookieJWT } = require('../utils/cookieJWT')
const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT,Create)
    .put(verifyJWT, Update)
    
routerUser.route('/login')
      .post(Login)

routerUser.route('/me')
     .get(verifyJWT, Logged)
     
module.exports = routerUser;