"use estrict"
const getDB=require('../../db/db');


const deleteLink=async(req,res,next)=>{
let connection;
   try{
     connection= await getDB();

     const {id}=req.params;

      await connection.query(`
      DELETE
      FROM links 
      WHERE id_link = ?
      ` ,[id]);
       
   res.send({
         status: "ok",
         message: "The link has been deleted succesful!!!"
      })

   }catch(error){
    next(error);
    console.log(error)
   }finally{
     if(connection) connection.release();
   }
 
}

module.exports=deleteLink;