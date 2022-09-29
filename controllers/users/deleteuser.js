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
      message: 'The user has been deleted',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUser;