const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyJWT = (req, res, next) => {
  
       const result = req?.headers?.cookie
    if(!result) return res.status(404).json({"message":"Unauthorized User"}) 
    const token = result.split('=')[1];
    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded;
            next();
        }
    )
}

module.exports = {verifyJWT};