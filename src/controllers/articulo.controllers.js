const catchError = require('../utils/catchError');
const Articulo = require('../models/Articulo');
const User = require('../models/User');


const getAll = catchError(async(req, res) => {
   const resuls = await  Articulo.findAll()
   return res.status(200).json(resuls)
});

const Create = catchError(async(req, res)=>{
    
    const user= await User.findOne({where:{email:req.user.email}})
    if(!user) return res.status(404).json('usuario no valido')
    const results = await Articulo.create({...req.body, userId:user.id})

    if(!results) return res.status(404).json({"Data":"Articulo no Creado"})
        
        return res.status(200).json(results)
})


const Update = catchError(async(req, res)=>{

    const id = parseInt(req.params.id)
    const {items, cantidad, tipo, unidad_M, costo_unitario, fecha_vencimiento,fecha_ingreso } = req.body
    delete req.body.id
    const results = await Articulo.update({where:{id}})
    
})

module.exports = {
    getAll,
    Create
}