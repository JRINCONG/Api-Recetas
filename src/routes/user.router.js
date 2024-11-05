const { getAll, Create, Login, Logged } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJWT} = require('../utils/verifyJWT')
const { cookieJWT } = require('../utils/cookieJWT')
const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT, getAll)
    .post(Create)
    
routerUser.route('/login')
      .post(Login)

routerUser.route('/me')
     .get(verifyJWT,cookieJWT, Logged)
     
module.exports = routerUser;