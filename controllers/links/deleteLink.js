"use estrict"
const getDB=require('../../db/db');


const deleteLink=async(req,res,next)=>{
let connection;
   try{
     connection= await getDB();

     const {id}=req.params;

     const [idVote] = await connection.query(`

     SELECT id_votes
     FROM votes_links
     WHERE id_user=? AND id_link=?
     `,[req.Auth.id,id]);

     console.log(idVote[0].id_votes);

      await connection.query(`
      DELETE
      FROM votes_links 
      WHERE id_votes = ?
      ` , [idVote[0].id_votes]);

      // await connection.query(`
      // DELETE
      // FROM links 
      // WHERE id_link = ?
      // ` ,[id]);
       
   res.send({
         status: "ok",
         message: "The link has been removed succesfully!!!"
      })

   }catch(error){
    next(error);
    console.log(error)
   }finally{
     if(connection) connection.release();
   }
 
}

module.exports=deleteLink;