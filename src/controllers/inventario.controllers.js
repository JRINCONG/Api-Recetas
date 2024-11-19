const catchError = require('../utils/catchError');
const Inventario = require('../models/Inventario');
const Articulo = require('../models/Articulo')
const Users = require('../models/User');


const getAll = catchError(async(req, res) => {
  
    const {email} = req.user
    const User = await Users.findOne({where:{email}})
    if(!User) res.status.json({"message":"No usuario no Autorizado"})
     if(User.tipo === "user" || User.tipo ==="admin"){
         const result = await Inventario.findAll()
         const Results = result.map((items)=>{
                return{
                        nombre: items.nombre,
                        cantidad_disponible: items.cantidad_disponible,
                        unidad: items.unidad,
                        estado: items.estado,
                        fecha: items.fecha  
                    }
         })
        
         return res.status(200).json(Results)
     }   
});

const getBelowQuantity = catchError (async(req, res)=>{
    const {email} = req.user
    const User = await Users.findOne({where:{email}})    
    if(!User) res.status.json({"message":"No usuario no Autorizado"})
        if(User.tipo === "user" || User.tipo ==="admin"){
              
            const Results = await Articulo.findAll()
            const Data = Results.filter((items)=>{
                     if(items.cantidad_restante <= items.cantidad_minima){
                        return items
                     }
            })
            if(Data.length === 0) return res.status(200).json({"message":"Articulos con cantidades Normales"})
            return res.status(200).json(Data)
        }
      res.status(404).json({"message":"No Autorizado"})  
})



const ArticulosVencidos = catchError(async(req,res)=>{
    const { email } = req.user;
    const User = await Users.findOne({where:{email}})
    if(!User) return res.status(404).json({"message":"No found"})
     if(User.tipo === "user" || User.tipo ==="admin"){
         const Results = await Articulo.findAll()
     const hoy = new Date()
     const otro =  new Date(hoy)   
    const Reque = Results.filter((item)=>{
         const fechaVencimiento = new Date(item.fecha_vencimiento)
                 if(fechaVencimiento.getTime() < otro.getTime() ){            
                            return{
                                articulo: item.items,
                                cantidad: item.cantidad,
                                cantidad_restante: item.cantidad_restante,
                                cantidad_minima: item.cantidad_minima,
                                tipo: item.tipo,
                                unidad: item.unidad_M,
                                costo_unitario: item.costo_unitario,
                                fecha_vencimiento: item.fecha_vencimiento,
                                fecha_ingreso: item.fecha_ingreso,
                                imagen: item.imagen                                
                            }

                 } 

       
    })
        
     
    
    res.status(200).json(Reque)
        
     }   
    
})

module.exports = {
    getAll,
    getBelowQuantity,
    ArticulosVencidos,
}


