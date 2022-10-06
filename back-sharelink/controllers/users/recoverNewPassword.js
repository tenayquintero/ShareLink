'use strict';

const getDB = require('../../db/db');
const { generateError, validate } = require('../../helpers');
const { newPasswordSchema } = require('../../schemas');

const recoverNewPassword = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { recover_code, newPassword } = req.body;

    if (!recover_code || !newPassword) {
      generateError(
        "The field  'recover_code' and 'newPassword'  is required",
        400
      );
    }
    await validate(newPasswordSchema, newPassword);

    const [compareRC] = await connection.query(
      `
    SELECT recover_code
    FROM users
    WHERE recover_code=?
    `,
      [recover_code]
    );

    if (compareRC.length === 0) {
      generateError('The recover code is not valid', 404);
    }

    await connection.query(
      `
    UPDATE users
    SET password=SHA2(?,512) ,recover_code=null
    WHERE recover_code=?
    `,
      [newPassword, recover_code]
    );

    res.send({
      status: 'OK',
      message: 'The password has been changed succesfuly!!!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = recoverNewPassword;
