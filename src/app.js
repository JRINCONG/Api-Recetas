const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const cookieParser = require('cookie-parser')
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

// Esta es nuestra aplicación
const app = express();

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors({ origin:"http://localhost:5173", credentials:true }));
app.use(cookieParser())
app.use('/api/v1', router);

app.get('/', (req, res) => {
    return res.send("Welcome to express!");
})

// middlewares después de las rutas
app.use(errorHandler)

module.exports = app;
