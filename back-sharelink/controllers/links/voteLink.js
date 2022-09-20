"use strict"

const getDB = require('../../db/db');
const { generateError } = require('../../helpers');

const voteLink = async (req, res, next) => {
    let connection;
    try {
        //se realiza la conexión
        connection = await getDB();

        //Recojo parámetros
        const { id } = req.params;
        const { vote } = req.body;
      
        //compruebo que el valor de votos es entre 1 y 5
        if (vote < 1 || vote > 5) {
            generateError('Please vote between 1 and 5', 400);

        }
        if (!vote) {
            generateError('Cannot vote null, please vote between 1 and 5', 400)
        }

        //Compruebo si el usuario ha votado con anterioridad
        const [existingVote] = await connection.query(`
        SELECT id_votes
        FROM votes_links
        WHERE id_user =? AND id_link=?
        `, [req.Auth.id, id]);

        if (existingVote.length > 0) {
            generateError('Already Vote', 403);

        }

        //Añadir voto a la tabla
        await connection.query(`
        INSERT INTO votes_links(vote, id_user, id_link)
        VALUES (?,?,?)
        `, [vote, req.Auth.id, id]);

        //Media de votos
        const [newVotes] = await connection.query(`
        SELECT AVG(votes_links.vote) AS votes
        FROM votes_links
        LEFT JOIN links ON(links.id_link = votes_links.id_link)
        WHERE links.id_link=?
        `, [id]);

        res.send({
            status: "ok",
            data: {
                votes: newVotes[0].votes,
            },

        });

    } catch (error) {
        next(error);

    } finally {
        //se suelta la conexión
        if (connection) connection.release();
    }

};


module.exports = voteLink;