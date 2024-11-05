const catchError = require('../utils/catchError');
const Inventario = require('../models/Inventario');

const getAll = catchError(async(req, res) => {

    const result = await Inventario.findAll()
    return res.json(result)
});

module.exports = {
    getAll
}