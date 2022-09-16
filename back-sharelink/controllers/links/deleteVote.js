"use estrict"
const getDB = require('../../db/db');


const deleteVote = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { id } = req.params;

        await connection.query(`
          DELETE
          FROM votes_links 
          WHERE id_votes = ?
      ` , [id]);

        res.send({
            status: "ok",
            message: "The vote has been removed succesfully!!!"
        })

    } catch (error) {
        next(error);
        console.log(error)
    } finally {
        if (connection) connection.release();
    }

}

module.exports = deleteVote;
