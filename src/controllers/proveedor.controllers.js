const catchError = require('../utils/catchError');
const Proveedor = require('../models/Proveedor');

const getAll = catchError(async(req, res) => {
    
    const results = await Proveedor.findAll()
    return res.status(200).json(results)
});

const Create = catchError(async(req, res)=>{
     const { razon_social, nit,  email, phone, direccion } = req.body
     const NewProvedor={
        razon_social,
        nit,
        email,
        phone,
        direccion
     }
     const results = await Proveedor.create(NewProvedor)
     if(!results) return res.status(404).json({"message":"Proveedor not Register"})

        res.status(200).json(results)
})

module.exports = {
    getAll,
    Create
}