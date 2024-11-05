const Articulos =require('../models/Articulo');
const Inventario = require('../models/Inventario')
 

const InventariosAdd = async(RecetaIngr, results)=>{
 let array=[]
    RecetaIngre.map(async(items, index)=>{
      const articulo = await Articulos.findOne({where:{id:items.id}})
      items.catidad
    })
    
    const result = await Articulos.findOne({where:{id:4}})
   console.log(array)
}
module.exports = InventariosAdd