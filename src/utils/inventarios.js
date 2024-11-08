const Articulos =require('../models/Articulo');
const Inventario = require('../models/Inventario')
const User =require('../models/User');
 
const SumarRecetas = async (sumar)=>{
let suma=0;
 console.log("Este es sumar en la funcion",sumar)
  sumar.map((items)=>{
   
        suma += items.cantidad
  })
 
return suma

}

const InventariosAdd = async(RecetaIngr, users, req)=>{
 let new_inventario={}
   const Sumatoria = await SumarRecetas([...RecetaIngr])
   console.log("Esta es sumatoria", Sumatoria)
  const user = await User.findOne({where:{email:users.email}})
  //realizar un ciclo para poder sumar todas las cantidades de la receta
    RecetaIngr.map(async(item, index)=>{
     
      const articulo = await Articulos.findOne({where:{id:item.articuloId}})

     //const Invent_articulo = await Inventario.findOne({where:{articuloId:item.articuloId}})
     let CantidadDisponible= articulo.cantidad_restante * req.cantidad
     const vlr = Math.round(req.catidad/120)
     console.log("Valor =====>>>", vlr)
   const hoy= new Date()
             //const Cant = articulo.cantidad_restante - (item.cantidad * vlr)
       
              const new_inventario = {
                          nombre:articulo.items,
                          cantidad_disponible: item.cantidad * vlr,
                          unidad:articulo.unidad_M,
                          fecha : new Date(hoy),
                          articuloId:articulo.id,
                          userId:user.id
                   }
      
      console.log("El nuevo Objeto========>>>>",  new_inventario)
     
     // const Update = await Articulos.update({where:{id:articulo.id}})
      const Result =  await Inventario.create(new_inventario)
      return ({"message":"Descargado exitosamente"})
    

   
    
    })
    
    
  
}
module.exports = InventariosAdd