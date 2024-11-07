const Articulos =require('../models/Articulo');
const Inventario = require('../models/Inventario')
const User =require('../models/User');
 

const InventariosAdd = async(RecetaIngr, users)=>{
 let array=[]
 let new_inventario={}

  const user = await User.findOne({where:{email:users.email}})
  
    RecetaIngr.map(async(item, index)=>{
     const articulo = await Articulos.findOne({where:{id:item.articuloId}})

     const Invent_articulo = await Inventario.findOne({where:{articuloId:item.articuloId}})
     const InvSumatoria = await Inventario.findAll({where:{articuloId:item.articuloId}})
     console.log("Este es Items", item)
     console.log("Invent_articulo", Invent_articulo)    
   

   const hoy= new Date()
   console.log()
          if(Invent_articulo)
          {
            
               new_inventario = {
                          nombre:articulo.items,
                          cantidad_disponible: item.cantidad,
                          unidad:articulo.unidad_M,
                          fecha : new Date(hoy),
                          articuloId:articulo.id,
                          userId:user.id
                   }
          }else{

                 new_inventario = {
                  nombre:articulo.items,
                  cantidad_disponible: item.cantidad,
                  unidad:articulo.unidad_M,
                  fecha : new Date(hoy),
                  articuloId:articulo.id,
                  userId:user.id
                }
          }
      console.log("El nuevo Objeto",  new_inventario)
      const Result =  await Inventario.create( new_inventario)
      if(Result) return ({"message":"Descargado exitosamente"})
    

   
    
    })
    
    
  
}
module.exports = InventariosAdd