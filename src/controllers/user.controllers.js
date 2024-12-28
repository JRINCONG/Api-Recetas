const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getAll = catchError(async(req, res) => {
   const {email} = req.user
   const Users = await User.findOne({where:{email}})
   console.log("controlador")
   if(Users.tipo === "admin"){
     const results = await User.findAll()
   
     if(!results) res.status(404).json({"message":"Usuario no valido"})
      const Data = results.map((x)=>{
      return {
        id: x.id,
        first_Name:x.first_Name,
        last_Name:x.last_Name,
        email:x.email,
        phone:x.phone,
        tipo:x.tipo,
        imagen:x.imagen,
        cargo:x.cargo
      }
    })
   
      return res.status(200).json(Data)
   }
    return res.status(404).json({"message":"No autorizado"})
});

const Create =catchError(async(req, res)=>{
   //formatear el texto 
const { first_Name, last_Name, email, phone, tipo, password, imagen,cargo } = req.body 
  const registered = await User.findOne({where:{email}})
  if(registered) return res.status(404).json({"message":"correo existente"})
  const Users = await User.findOne({where:{email:req.user.email}})
  if(Users.tipo === "admin"){
    const haspassword = await bcrypt.hash(password, 10)
      const NewUser ={
      first_Name:first_Name.toLowerCase(),
      last_Name:last_Name.toLowerCase(),
      email:email.toLowerCase(),
      phone,
      imagen,
      cargo:cargo.toLowerCase(),
      password:haspassword,
      tipo
    }
    console.log(NewUser)
     const result = await User.create(NewUser)
     if(!result) return res.status(404).json({"message":"Usuario no Registrado"})
     const obje ={
        first_Name:result.first_Name,
        last_Name:result.last_Name,
        email:result.email,
        phone:result.phone,
        tipo:result.tipo,
        imagen:result.imagen,
        cargo:result.cargo
    }
      return res.status(200).json(obje)
  }
  res.status(404).json({"message":"no autorizado"})

})

const Update =catchError(async(req, res)=>{
  const {email} = req.user
  const Results = await User.findOne({where:{email}})
  if(!Results) return res.status(404).json({"message":"No autorizado1"})
   
    if(Results.tipo ==='admin'){
    if(req.body.password){
      const haspassword = await bcrypt.hash(req.body.password, 10)
      req.body.password = haspassword;
    }
   
    const Resul = await User.update(req.body,{where:{email:req.body.email}, returning:true})
    return res.status(200).json({"message":"Usuario Actualizado"})
   }
   res.status(404).json({"message":"No Autorizado"})
})


const Login = catchError(async(req, res)=>{
const { email, password } = req.body;
const user = await User.findOne({where:{email}})
if(!user) return res.status(404).json({"Data":"Datos invalidos"})

 const isValid = await bcrypt.compare(password , user.password ) 

 if(!isValid) res.status(404).json({"message":"Datos invalidos"})

        const usuario={
          email:user.email,
          name:user.first_Name
         }
    
         const token = jwt.sign(
        usuario,
        process.env.TOKEN_SECRET,
        {expiresIn:'4h'}
        )
      
      res.cookie('token', token,{
        httpOnly: true, // No accesible desde JavaScript del cliente
        secure: false,//process.env.NODE_ENV === 'production', // Solo HTTPS en producción
        sameSite: 'strict', // Protege contra CSRF
        maxAge: 30 * 60 * 1000, // Expira en 30 minutos
        //path: '/',               // Cookie disponible en todas las rutas
        //domain: 'localhost' 
      })
        
     

   res.status(201).json({"message":"exitoso"})
})

const Logged = catchError(async(req,res)=>{
  const { email } = req.user
  const results = await User.findOne({where :{email}})
  if(!results) res.status(404).json({"message":"User not found"})

   const datos={
             first_Name:results.first_Name,
             last_Name:results.last_Name,
             email:results.email,
             phone:results.phone,
             tipo:results.tipo,
             imagen:results.imagen
     }
  const token = req.headers.cookie.split('=')[1]
  
    res.status(200).json({datos, token})
})


const Logout = catchError(async(req, res)=>{
   
   res.clearCookie('token');
   res.status(200).json({"message":"Closed Sesion"});

})


module.exports = {
    getAll,
    Create,
    Update,
    Login,
    Logged,
    Logout,
    
}