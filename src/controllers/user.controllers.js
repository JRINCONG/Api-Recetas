const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  { serialize } = require('cookie')

const getAll = catchError(async(req, res) => {
    const results =await User.findAll()
    return res.status(200).json(results)
});

const Create =catchError(async(req, res)=>{

  const { name, email, password, tipo, phone}= req.body
  const haspassword = await bcrypt.hash(password, 10)
  const user={
    name,
    email,
    password:haspassword,
    tipo,
    phone
  }
   const result = await User.create(user)
   if(!result) return res.status(404).json({"Data":"Users not create"})

    return res.status(200).json(result)

})


const Login = catchError(async(req, res)=>{
const { email, password } = req.body;
const user = await User.findOne({where:{email}})

if(!user) return res.status(404).json({"Data":"Error"})

 const isValid = await bcrypt.compare(password , user.password ) 

 if(!isValid) res.status(404).json({"message":"sorry"})

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
  const { email } = req.user
  const results = await User.findOne({where :{email}})
  if(!results) res.status(404).json({"message":"User not found"})

   const datos={
             name:results.name,
             email:results.email,
             phone:results.phone
     }
 
    res.status(200).json(datos)
})
module.exports = {
    getAll,
    Create,
    Login,
    Logged
}