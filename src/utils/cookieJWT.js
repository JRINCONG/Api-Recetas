const jwt = require('jsonwebtoken');

require('dotenv').config();

const cookieJWT = (req, res, next) => {
    const authHeader = req.headers.cookie || req.headers.cookie;    
    if (!authHeader?.startsWith('Recetasjr=')) return res.sendStatus(401);
    const token = authHeader.split('=')[1]; 
    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.usuario;
            next();
        }
    )
}

module.exports = {cookieJWT};