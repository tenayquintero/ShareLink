"use strict"

const getDB=require('../db/db');
const { generateError } = require('../helpers');

const authEditVote=async(req,res,next)=>{
    let connection;
try{
  
    connection= await getDB();

    const{id}=req.params;

    const [owner] = await connection.query(`
    
    SELECT id_votes
    FROM votes_links
    WHERE id_user =? AND id_votes=?
    `, [req.Auth.id,id]);

    if(owner.length === 0){
        generateError("The user is unauthorizade", 401)
    }


    next();
}catch(error){
    next(error);
}finally{
if(connection) connection.release();
}
    
};

module.exports=authEditVote;