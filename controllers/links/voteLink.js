"use strict"

const getDB = require('../../db/db');
const { generateError } = require('../../helpers');

const voteLink = async(req,res, next)=>{
    let connection;
    try {
        //se realiza la conexión
        connection = await getDB();

        //Recojo parámetros
        const {id}=req.params;
        const {voto}=req.body;

        //compruebo que el valor de votos es entre 1 y 5
        if(voto <1 || voto>5){
            generateError('Please vote between 1 and 5', 400);
            
        }

        //Compruebo si el usuario es quien ha compartido el enlace
        const [current]=await connection.query(`
        SELECT id_user
        FROM links
        WHERE id=?
        `[id]);

        if(current[0].id_user === req.Auth.id){
            generateError('Is your link, you cannot vote', 403);
           
        }

        //Compruebo si el usuario ha votado con anterioridad
        const[existingVote]= await connection.query(`
        SELECT id_votes
        FROM votes_links
        WHERE id_user=? AND id_link=?
        `,[req.Auth.id, id]);

        if(existingVote.lenght > 0){
            generateError('Already Vote', 403);
           
        }

        //Añadir voto a la tabla
        await connection.query(`
        INSERT INTO votes_links(create_date,vote, id_user, id_link)
        VALUES (?,?,?,?)
        `[voto,id,req.Auth.id]);

        //Media de votos
        const[newVotes] = await connection.query(`
        SELECT AVG(vote_links.vote) AS votes
        FROM links
        LEFT JOIN votes_links ON(link.id_link = votes_link.id_votes)
        WHERE links.id
        `[id]);
     
        
        
        res.send({
            status:"ok",
            data:{
                votes: newVotes[0].votes,
            },
            
        });
        
    } catch (error) {
        next(error);
        
    }finally{
        //se suelta la conexión
        if(connection) connection.release();
    }

};


module.exports = voteLink;