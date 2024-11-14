const catchError = require('../utils/catchError');
const Articulos_menores = require('../models/Articulos_menores');

const consulta = catchError(async(req, res) => {
    const Results = await Articulos_menores.findAll()
    return res.status(200).json(Results)
});

module.exports = {
    consulta
}