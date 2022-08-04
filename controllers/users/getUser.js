"use strict"

const getDB=require('../../db/db');

 const getUser=async(req, res, next)=>{
 let connection;
try{
    //Se abre la conexión
    connection= await getDB();

    //Comprobación de usuario :id url y id authoritation
    const{id}=req.params;
  
    const [user]=await connection.query(`
        SELECT date,name,email,perfil,role
        FROM users
        WHERE id_user = ?
    `
        ,[id]);
       
        //Información que se le da a un usuario ajeno a su perfil
        const info={
        name:user[0].name,
        perfil:user[0].perfil
    }  

    if (req.Auth.id === Number(id) || req.Auth.role==="admin") {
        
       //Información que se le da a un usuario dueño de su perfil o admin
        info.date = user[0].date
        info.email = user[0].email,
        info.role = user[0].role
    }
    
    res.send({
        status: "ok",
        message: "User",
        data:info
       
       
    })
     }catch(error){
        next(error);

    }finally{
    //Soltamos la conexión
    if(connection) connection.release()
   }

 }
 module.exports=getUser;