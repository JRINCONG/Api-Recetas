const catchError = require('../utils/catchError');
const Articulo = require('../models/Articulo');
const User = require('../models/User');


const getAll = catchError(async(req, res) => {
   const user = await User.findOne({where:{email:req.user.email}})
   if(!user) return res.status(404).json({"Data":"No Autorizado"})
   const resuls = await  Articulo.findAll()
   return res.status(200).json(resuls)
});

const Create = catchError(async(req, res)=>{
   
    let item= req.body.items?.toLowerCase()
    if(!item) return res.status(404).json({"message":"Not Found"})
    const Items_existente = await Articulo.findOne({where:{item}})
    if(Items_existente) return res.status(404).json({"message":"Articulo ya existe"})

    const user= await User.findOne({where:{email:req.user.email}})
    if(!user) return res.status(404).json('usuario no valido')
    
 
    const results = await Articulo.create({...req.body, userId:user.id,items})

    if(!results) return res.status(404).json({"Data":"Articulo no Creado"})
        
        return res.status(200).json(results)
})


const Update = catchError(async(req, res)=>{
    
    const user = await User.findOne({where:{email:req.user.email}})
   if(!user) return res.status(404).json({"Data":"No Autorizado"})
    const id = parseInt(req.params.id)
    const {items, cantidad, tipo, unidad_M, costo_unitario, fecha_vencimiento,fecha_ingreso } = req.body
    delete req.body.id
    const results = await Articulo.update(req.body, {where:{id}, returning: true})
    if(!results[0] === 0) return res.status(404).json({"Data":"Don't article Update"})
    
    res.status(200).json(results[1][0])
})

module.exports = {
    getAll,
    Create,
    Update
}