const catchError = require('../utils/catchError');
const Recetas = require('../models/Receta');
const Recet_articulo = require('../models/Recetas_ingredientes')
const ingrediente = require('../models/Articulo')
const User = require('../models/User')


const getAll = catchError(async(req, res) => {
   
    //const 
    const Resulst = await Recetas.findAll({where:{},
        include:{
            model:Recet_articulo,
            attributes:{exclude:['id','createdAt','updatedAt','recetumId','articuloId']}}},
        
    )
    res.status(200).json(Resulst)

});


const Create = catchError(async(req, res)=>{
    let nombre = req.body.name.toLowerCase()
    const unique_nombre = await Recetas.findOne({where:{name:nombre}})
    if(unique_nombre) return res.status(404).json({"Data":"NO puedes Repetir la Receta"})
    const { name, T_preparacion, T_coccion, imagen, descripcion , video} = req.body
     nombre = req.body.name.toLowerCase()
    const Recet ={
        name:nombre,
        descripcion,
        T_preparacion,
        T_coccion,
        imagen,
        video
    }
   
    const results = await Recetas.create(Recet)

    if(!results) return res.status(404).json({"Data":"Don't create receta"})

        return res.status(201).json(results)

})


const AddIngrediente = catchError(async(req, res)=>{
    const id = parseInt(req.params.id)
    console.log(id)
    const {recetumId, articuloId, cantidad, unidad } = req.body

    const isValue = await Recet_articulo.findOne({where:{recetumId:id, articuloId }})
  console.log("Este is value",isValue)
   if(!isValue){
       if(id){
           const articulo = await ingrediente.findOne({
               where:{id:articuloId}
       })        
           const datos={
                items:articulo.items,
                recetumId:id,
                articuloId,
                cantidad, 
                unidad
           }
           const results = await Recet_articulo.create(datos)
           return res.status(201).json(results)
   
       }

   }
    return res.status(401).json({"Data":"Ingrediente existente en esta Receta!!"})

})

const getOne = catchError(async(req, res)=>{
    const id = parseInt(req.params.id)
    const result = await Recetas.findOne({where:{id},
        include:[{  
            model:Recet_articulo, 
            attributes:{exclude:['id','createdAt','updatedAt','recetumId','articuloId']}}],       
        });
        if(!result) return res.status(404).json("no encontrado")
        return res.status(201).json(result)
})

const Update = catchError(async(req, res)=>{
    const id =  parseInt(req.params.id);
    delete req.body.id
    console.log("reques",req.body)
    const results = await Recetas.update(req.body,{where:{id},returning: true})
    if(!results[0] === 0) return res.status(404).json({"Data":"Don't receta Update"})
        return res.json(results[1][0])
})

const Delete = catchError(async(req, res)=>{
    const user = await User.findAll({where:{email:req.user.email}})
    if(user.tipo === "admin"){
        const id =  parseInt(req.params.id);
       const results =  await Recetas.destroy({where:{id}}) 
       res.json({"Data":"Delete sucessfull Receta"})
    }
    res.status(404).json({"Data":"Usuario no Autorizado"})
})

module.exports = {
    getAll,
    Create,
    AddIngrediente ,
    getOne,
    Update,
    Delete
}