const catchError = require('../utils/catchError');
const Recetas = require('../models/Receta');
const Recet_articulo = require('../models/Recetas_ingredientes')
const ingrediente = require('../models/Articulo')


const getAll = catchError(async(req, res) => {
   
    console.log("Recta controllers", req.user)
    const Resulst = await Recetas.findAll()
    res.status(200).json(Resulst)

});


const Create = catchError(async(req, res)=>{
     
    const {name, T_preperacion, T_coccion, imagen , video} = req.body
    const results = await Recetas.create(req.body)

    if(!results) return res.status(404).json({"Data":"Don't create receta"})

        return res.status(201).json(results)

})


const AddIngrediente = catchError(async(req, res)=>{
    const id = parseInt(req.params.id)
    console.log(id)
    const {recetumId, ArticuloId, cantidad, unidad } = req.body

    const isValue = await Recet_articulo.findOne({where:{recetumId:id, ArticuloId }})
  console.log("Este is value",isValue)
   if(!isValue){
       if(id){
           const articulo = await ingrediente.findOne({
               where:{id:ArticuloId}
       })        
           const datos={
                items:articulo.items,
                recetumId:id,
                ArticuloId,
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
            attributes:{exclude:['id','createdAt','updatedAt','recetumId','ArticuloId']}}],       
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
    const id =  parseInt(req.params.id);
   const results =  await Recetas.destroy({where:{id}}) 
   res.json({"Data":"Delete sucessfull Receta"})
})

module.exports = {
    getAll,
    Create,
    AddIngrediente ,
    getOne,
    Update,
    Delete
}