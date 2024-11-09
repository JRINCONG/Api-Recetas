const catchError = require('../utils/catchError');
const Preparacion = require('../models/Preparacion');
const User = require('../models/User')
const Receta = require('../models/Receta')
const Receta_Ingre = require('../models/Recetas_ingredientes')
const Articulos =require('../models/Articulo');
const { InventariosAdd, ArticId, SumarRecetas }= require('../utils/inventarios')

const getAll = catchError(async(req, res) => {

    const results = await Preparacion.findAll()
    return res.status(200).json(results)
});

const Create = catchError(async(req, res)=>{
    const {email, id} = req.user

const user = await User.findOne({where:{email}})

if(user.tipo === "admin"){      
            const { nombre_receta, catidad, fecha, recetumId } = req.body       
            const transfer ={
                catidad,
                fecha,
                recetumId,
                userId:user.id
            }    
            const receta = await Receta.findOne({where:{id:recetumId}})
            transfer.nombre_receta = receta.nombre
            const RecetaIngre = await Receta_Ingre.findAll({where:{recetumId:receta.id}})                
      
            const Respuesta = await InventariosAdd(RecetaIngre,user.id,req.body)                  
            
           return res.status(201).json(Respuesta[0])
    }
        return res.status(404).json({"message":"Usuario no Autorizado"})
})

module.exports = {
    getAll,
    Create
}