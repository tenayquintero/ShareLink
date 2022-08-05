"use estrict"
const getDB=require('../../db/db');
const { generateError } = require("../../helpers");

const deleteLink=async(req,res,next)=>{
let connection;
   try{

      connection= await getDB();
       const { id } = req.params;

     
     const [result] = await connection.query(`
     SELECT id_user
     FROM links
     WHERE id_user=?

     `, [id]);
     console.log(result);
   //   if(req.Auth.id!== result[0].id_user){
   //    generateError("no",401)
   //   }
     
    

     
     
      // if (result[0].id_link !== req.Auth.id){
      //    generateError("The user is unauthorized", 401)
      // }

     




      res.send({
         status: "ok",
         message: "The link has been deleted succesful!!!"
      })

   }catch(error){
    next(error);
   }finally{
     if(connection) connection.release();
   }
 
}

module.exports=deleteLink;