const { getAll, Create, Login, Logged, Update, Logout } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJWT} = require('../utils/verifyJWT')
const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT,Create)
    .put(verifyJWT, Update)
    
routerUser.route('/login')
      .post(Login)

routerUser.route('/me')
     .get(verifyJWT, Logged)

routerUser.route('/logout')
     .post(verifyJWT, Logout) 

   
     
module.exports = routerUser;