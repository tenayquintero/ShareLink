"use strict"

const getDB = require('../../db/db');

const getLink = async (req, res, next) => {
  let connection;
  try {

    connection = await getDB();

    const { id } = req.params;

    const [link] = await connection.query(`
          SELECT title, url,description
          FROM links
          WHERE id_link=? 
       
        `, [id]);

    const [vote] = await connection.query(`

          SELECT AVG(IFNULL(vote,0)) AS voteAVG
          FROM votes_links
          WHERE id_link=? 
          GROUP BY id_link
       `, [id]);


    res.send({
      status: "ok",
      message: "Link",
      data: {
        ...link[0],
        ...vote[0]
      }
    })

  } catch (error) {
    next(error);
    throw error

  } finally {
    //solatamos conexión
    if (connection) connection.release();

  }
}

module.exports = getLink;