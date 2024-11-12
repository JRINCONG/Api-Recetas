const { json } = require('sequelize');
const Articulos =require('../models/Articulo');
const Inventario = require('../models/Inventario')
const User =require('../models/User');

 
const SumarRecetas = async (sumar)=>{
let suma=0;
   sumar.map((items)=>{   
        suma += items.cantidad       
  })  
return suma
}

const Array = (array)=>{
  return valor = array.map((items)=>{
          return items.articuloId
   })
}

const  InventariosAdd = async(RecetaIngr, users, req,receta)=>{
 let new_inventario={}
 let Result=[]
 let conta =0;
 let ArryArticulosNew=[]
 let CantidadArticulos=[]

 //funcion para sumar los gramos de cada ingrediente
   const Sumatoria = SumarRecetas([...RecetaIngr])
   //creamos un arreglo con la cantidad de articulos que incluyen la receta
  const ArrayARticulos =  Array([...RecetaIngr])
  
   //Buscamos el usuario que esta logueado
  // const user = await User.findOne({where:{email:users.email}})
  // if(!user) return {"message":"Not found"}
  //realizar un ciclo para poder sumar todas las cantidades de la receta
  

return Result = Promise.all(RecetaIngr.map(async(item,index)=>{
     
      const articulo = await Articulos.findOne({where:{id:item.articuloId}})

     //Calculando la cantidad que enviaron a preparar para un plato que seria 120
     // la vlr seria la cantidad de cada ingrediente a preparar 
     const vlr = Math.floor(req.catidad/120)
       const valor = articulo.cantidad_restante + item.cantidad * vlr
        const hoy = new Date()
             const Cant = articulo.cantidad_restante - (item.cantidad * vlr)
           const minimo = articulo.cantidad_restante - articulo.cantidad_minima
           //validando el incventario
        if(Cant  > articulo.cantidad_minima){
                  
                          const new_inventario = {
                                    nombre:articulo.items,
                                    cantidad_disponible: item.cantidad * vlr,
                                    unidad:articulo.unidad_M,
                                    fecha : new Date(hoy),
                                    articuloId:articulo.id,
                                    userId:users
                            }                     
                               
                            if(new_inventario)  ArryArticulosNew[conta] = new_inventario
                                 CantidadArticulos[conta] = Cant
                                 conta++
                                 console.log("ArryArticulosNew", ArryArticulosNew)
                                if(ArrayARticulos.length === ArryArticulosNew.length){
                                    
                                   ArryArticulosNew.map(async(arti,index)=>{
                                  await  Articulos.update({cantidad_restante:CantidadArticulos[index]},{where:{id:arti.articuloId}})
                                                                  
                                    const INV =  await Inventario.create(arti)                                     
                                  })
                                  
                                  
                                                              
                                }
                                return json("Faltan Ingredientes a la Receta",ArryArticulosNew)
                                 
                                             
                             
                  }else{
                       
                      return json("Faltan Ingredientes a la Receta",ArryArticulosNew)
                      
                  }

   
                
                  return ({"message":"Receta descargada del Inventario"})  
  
}))
}  
module.exports = {
  InventariosAdd,
  SumarRecetas

}
