"use strict"
const getDB = require("../../db/db");

const listLink = async (req, res, next) => {
    let connection;
    try {
        //se abre conexion
        connection = await getDB();

        //ver todas los enlaces solo mostrar url,title
        const { search, order, direction } = req.query;

        let result;

        //Dar por orden de :title, creation_date or vote
        const fieldCkeck = ["title", "creation_date", "vote"];
        const orderByfield = fieldCkeck.includes(order) ? order : "creation_date";

        //ASC || DESC
        const orderCheck = ["ASC", "DESC"];
        const orderByDirection = orderCheck.includes(direction) ? direction : "DESC";
       
        //preferencia de búsqueda
        if (search) {
            
        [result] = await connection.query(`
            SELECT links.id_link,title,image,url,AVG(IFNULL(votes_links.vote,0)) AS voteAVG,description,email,users.id_user
            FROM links
           INNER JOIN users ON(links.id_user = users.id_user)
            LEFT JOIN votes_links ON(links.id_link = votes_links.id_link)
            WHERE url like ? or title like ? or description like ?
            GROUP BY links.id_link
            ORDER BY ${orderByfield} ${orderByDirection}
             
            `, [`%${search}%`, `%${search}%`, `%${search}%`])
        } else {

        [result] = await connection.query(`
            SELECT links.id_link,title,image,url,AVG(IFNULL(votes_links.vote,0)) AS voteAVG,description,email,users.id_user
            FROM links
            INNER JOIN users ON(links.id_user = users.id_user)
            LEFT JOIN votes_links ON(links.id_link = votes_links.id_link)
            GROUP BY links.id_link
            ORDER BY ${orderByfield} ${orderByDirection}
         `);
        }

        res.send({
            status: "ok",
            message: `List link`,
            data: result
        })

    } catch (error) {
        next(error);

    } finally {
        //soltamos la conexión
        if (connection) connection.release();

    }

}

module.exports = listLink;