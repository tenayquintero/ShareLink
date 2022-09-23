const getDB = require('../../db/db')
const ownerLink = async (req, res, next) => {
    let connection;
    try {

        connection = await getDB();

        const [yourLinks] = await connection.query(
            `
            SELECT links.id_link,title,url,image,description,AVG(IFNULL(votes_links.vote,0)) AS vote
            FROM links
            LEFT JOIN votes_links ON(links.id_link = votes_links.id_link)
            WHERE links.id_user = ?
            GROUP BY links.id_link
            `
            , [req.Auth.id])
        console.log(req.Auth.id)


        res.send({
            status: "ok",
            message: 'Yours links',
            result: yourLinks
        })

    } catch (error) {
        next(error)
    } finally {
        if (connection) connection.release()
    }

}
module.exports = ownerLink;