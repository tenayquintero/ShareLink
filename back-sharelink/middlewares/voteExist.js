"use strict"

const getDB = require('../db/db');
const { generateError } = require('../helpers');

const voteExist = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { id } = req.params;

        const [existVote] = await connection.query(`
    
            SELECT id_votes
            FROM votes_links
            WHERE id_votes =?
    `, [id]);

        if (existVote.length === 0) {
            generateError("The vote doesn´t exist", 404)
        }

        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }

}
module.exports = voteExist;