"use stric"

const getDB=require('../../db/db');

 const getUser=async(req, res, next)=>{
 let connection;
try{
    //Se abre la conexión
    connection= await getDB();

    //Comprobación de usuario :id url y id authoritation
    const{id}=req.params;
    console.log(">>>>>",id);
   
    // console.log(typeof(id))
    // console.log(typeof(req.Auth.id)) 
    
     const [user]=await connection.query(`
        SELECT email
        FROM users
        WHERE id_user = ?
    `
        ,[id]);
       
    
       

    const info={
        name:user[0].name,
        perfil:user[0].perfil
    }    
    if (req.Auth.id !== Number(id)) {
        info
    }else{
        info.date=user[0].date
        info.email=user[0].email,
        info.role=user[0].role
    }
    
    res.send({
        status: "ok",
        message: "User",
        data:user
       
       
    })
}catch(error){
next(error);
throw error
}finally{
    //Soltamos la conexión
    if(connection) connection.release()
    process.exit(0);
}

 }
 module.exports=getUser;