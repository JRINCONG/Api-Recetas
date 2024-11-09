const { response } = require('express');
const Articulos =require('../models/Articulo');
const Inventario = require('../models/Inventario')
const User =require('../models/User');
const catchError = require('./catchError');
 
const SumarRecetas = async (sumar)=>{
let suma=0;
   sumar.map((items)=>{   
        suma += items.cantidad       
  })  
return suma
}

const ArticId = (ArticId)=>{
  return valor = ArticId.map((items, index)=>{
          return items.articuloId
   })
}

const  InventariosAdd = async(RecetaIngr, users, req,receta)=>{
 let new_inventario={}
 let Result=[]
 let conta =0;
 let ArryArticulos=[]
 //funcion para sumar los gramos de cada ingrediente
   const Sumatoria = SumarRecetas([...RecetaIngr])
  const Stlen =  ArticId([...RecetaIngr])
  

  console.log("Cantidad de articulos", Stlen.length)
   //Buscamos el usuario que esta logueado
 // const user = await User.findOne({where:{email:users.email}})
  //if(!user) return {"message":"Not found"}
  //realizar un ciclo para poder sumar todas las cantidades de la receta
  

return Result = Promise.all(RecetaIngr.map(async(item)=>{
     
      const articulo = await Articulos.findOne({where:{id:item.articuloId}})

     //Calculando la cantidad que enviaron a preparar para un plato que seria 120
     // la vlr seria la cantidad de cada ingrediente a preparar 
     const vlr = Math.floor(req.catidad/120)
       const valor = articulo.cantidad_restante + item.cantidad * vlr
        const hoy = new Date()
             const Cant = articulo.cantidad_restante - (item.cantidad * vlr)
           const minimo = articulo.cantidad_restante - articulo.cantidad_minima
           //validando el incventario
        if(articulo.cantidad_restante > articulo.cantidad_minima){

                  
  
                        const new_inventario = {
                                    nombre:articulo.items,
                                    cantidad_disponible: item.cantidad * vlr,
                                    unidad:articulo.unidad_M,
                                    fecha : new Date(hoy),
                                    articuloId:articulo.id,
                                    userId:users
                            }  
                                                                               
                            await  Articulos.update({cantidad_restante:Cant},{where:{id:articulo.id}})
                            const INV =  await  Inventario.create(new_inventario)
                            return ({"message":"Receta descargada del Inventario"})
                          
                  }else{
                       
                      return {"mssage":`Invantario escaso de ${articulo.items}` }
                      
                  }

   
    

  
}))
}  
module.exports = {
  InventariosAdd,
  ArticId,
  SumarRecetas

}
