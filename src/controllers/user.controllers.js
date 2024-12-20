const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  { serialize } = require('cookie')

const getAll = catchError(async(req, res) => {
   const {email} = req.user
   const Users = await User.findOne({where:{email}})
   
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
        name:result.name,
        email:result.email
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
          name:user.name
         }
     
         const token = jwt.sign(
        {usuario},
        process.env.TOKEN_SECRET,
        {expiresIn:'4h'}
        )
      
      const serialized = serialize('Recetasjr', token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'none',
        maxAge:1000*60*60*8*1,
        path:'/'
      })
      res.setHeader('Set-Cookie',serialized)

   res.status(201).json({"message":"succesfully",token})
})

const Logged = catchError(async(req,res)=>{
  console.log(req)
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
 
    res.status(200).json(datos)
})
module.exports = {
    getAll,
    Create,
    Update,
    Login,
    Logged
}