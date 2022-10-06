'use strict';

const { generateError } = require('../../helpers');
const getDB = require('../../db/db');

const deleteUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //user con id 1 nunca puede ser eliminado
    const { id } = req.params;
    if (Number(id) === 1) {
      generateError('This user cannot delete', 403);
    }

    if (Number(id) !== req.Auth.id && req.Auth.role !== 'admin') {
      generateError('User unauthorized', 401);
    }

    const { password } = req.body;

    if (!password) {
      generateError('The password is require', 400);
    }

    const [user] = await connection.query(
      `
     SELECT id_user 
     FROM users
     WHERE password = SHA2(?,512) && id_user=?
   `,
      [password, req.Auth.id]
    );

    if (user.length === 0) {
      generateError('The password is not correct', 404);
    }
    await connection.query(
      `
      UPDATE users
      SET name = "[delete]", password = "[delete]", perfil = null, active = false, last_up_ps=?, deleted = true
      WHERE id_user =?
`,
      [new Date(), id]
    );

    res.send({
      status: 'ok',
      message: 'The user has been deleted successfully!!!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUser;
