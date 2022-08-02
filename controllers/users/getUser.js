"use stric"
const getDB=require('../../db/db');

 const getUser=async(req, res, next)=>{
 let connection;
try{
    //Se abre la conexión
    connection= await getDB();

    //Comprobación de usuario :id url y id authoritation

    //información para usuario no propietario

    //información para usuario propietario y admin

    res.send({
        status: "ok",
        message: "User",
        data: []
    })
}catch(error){
next(error);
}finally{
    //Soltamos la conexión
    if(connection) connection.release();
    process.exit(0);
}

 }
 module.exports=getUser;