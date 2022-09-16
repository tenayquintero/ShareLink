"use strict"
const getDB=require('../../db/db');
const { generateError } = require('../../helpers');

const editVote=async(req,res,next)=>{

    let connection;
     try{

         connection = await getDB();

         const{id}=req.params;
         const {vote}=req.body;

         //compruebo que el valor de votos es entre 1 y 5
         if (vote < 1 || vote > 5) {
             generateError('Please vote between 1 and 5', 400);

         }
         if (!vote) {
             generateError('Cannot vote null, please vote between 1 and 5', 400)
         }
         
         await connection.query(`
         UPDATE votes_links
         SET vote = ?
         WHERE id_votes=?
         `,[vote,id]);

         //Media de votos
         const [newVotes] = await connection.query(`
        SELECT AVG(votes_links.vote) AS votes
        FROM votes_links
        WHERE id_votes=?
        `, [id]);

         res.send({
             status: "Ok",
             message: "The vote has been changed",
             votes:newVotes[0].votes

         });

     }catch(error){
        next(error);
     }finally{
        if(connection) connection.release();
     }
};

module.exports=editVote;