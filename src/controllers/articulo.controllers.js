const catchError = require('../utils/catchError');
const Articulos = require('../models/Articulo');
const User = require('../models/User');


const getAll = catchError(async(req, res) => {
   const user = await User.findOne({where:{email:req.user.email}})
   if(!user) return res.status(404).json({"Data":"No Autorizado"})
   const resuls = await  Articulos.findAll()
   return res.status(200).json(resuls)
});

const Create = catchError(async(req, res)=>{
   
    let items= req.body.items.toLowerCase()
    if(!items) return res.status(404).json({"message":"Not Found"})
    const Items_existente = await Articulos.findOne({where:{items}})
    if(Items_existente) return res.status(404).json({"message":"Articulo ya existe"})

    const user= await User.findOne({where:{email:req.user.email}})
    if(!user) return res.status(404).json('usuario no valido')
    const hoy = new Date()
    const fecha = new Date(hoy)
     req.body.cantidad_restante = req.body.cantidad;
     req.body.fecha_ingreso = fecha;
    const results = await Articulos.create({...req.body, userId:user.id,items})

    if(!results) return res.status(404).json({"Data":"Articulo no Creado"})
        
        return res.status(200).json(results)
})


const Update = catchError(async(req, res)=>{
    
    const user = await User.findOne({where:{email:req.user.email}})
   if(!user) return res.status(404).json({"Data":"No Autorizado"})
    const id = parseInt(req.params.id)
    delete req.body.id
    const results = await Articulos.findOne({where:{id}})
    console.log("este es el body",req.body)
    if(req.body.cantidad) {         
        req.body.cantidad_restante = results.cantidad_restante + req.body.cantidad;
    }
    const resultsUpdte = await Articulos.update(req.body,{where:{id}, returning: true})
    console.log("Este es resultsUpdte",resultsUpdte[0])

    if(resultsUpdte[0] === 0) return res.status(404).json({"message":"Articulo no Actualizado"})
    
    res.status(200).json({"message":"Articulo Actualizado correctamente"})
})

module.exports = {
    getAll,
    Create,
    Update
}