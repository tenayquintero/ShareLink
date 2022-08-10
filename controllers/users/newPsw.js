"use strict"

const getDB = require("../../db/db");
const { generateError, validate } = require("../../helpers");
const { newPasswordSchema }= require('../../schemas')

const newPsw=async(req,res, next)=>{
   let connection;
  try{
   connection=await getDB();

   const{id}=req.params;

   //comprobación de propietario de cuenta
     if (req.Auth.id !== Number(id) && req.Auth.role!=="admin") {
        generateError("The user is unauthorized for this action", 401)
     }
     //Se extrae la oldPassword para compararla con la password de la bd
   //Se extrae la password que se envia por el body para actualizarla en la bd
   const {newPassword,oldPassword}=req.body  

     //obligatorio los campos de oldPassword y newPassword
     if (!oldPassword) {
        generateError("The field 'OldPassword' is required", 400)
     }
     if (!newPassword) {
        generateError("The field 'NewPassword' is required", 400)
     } 
   

  const [comparePassword]= await connection.query(`
   SELECT id_user 
   FROM users
   WHERE password = SHA2(?,512) && id_user=?
   `, [oldPassword, req.Auth.id]);

   if(comparePassword.length === 0){
      generateError("The password is not correct",404)
   }
  
      //verificación formatos password;
    await validate(newPasswordSchema, newPassword);

   await connection.query(`
   UPDATE users 
   SET password = SHA2(?,512), last_up_ps = ?
   WHERE id_user=?

   `,[newPassword, new Date(), req.Auth.id]);

   //anular el token depués de cambio de password lo hago en thisIsUser

   res.send({
        status: "OK",
        message: "The password has been changed successfully!!!"
     })

  }catch(error){
   next(error)
  }finally{
   if(connection) connection.release();
  }
}
module.exports=newPsw;