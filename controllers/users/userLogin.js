'use strict';

const getDB = require('../../db/db');
const { validate, generateError } = require('../../helpers');
const { registrationSchema } = require('../../schemas');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res, next) => {
  let connection;
  try {
    const { email, password } = req.body;

    connection = await getDB();

    const [existUser] = await connection.query(
      `
    SELECT id_user, role 
    FROM users
    WHERE email=? AND password=SHA2(?, 512)

    `,
      [email, password]
    );
    if (existUser.length === 0) {
      generateError('Email or Password not valid', 404);
    }
    console.log(existUser);
    //introducir informacion al token
    const info = {
      id: existUser[0].id_user,
      role: existUser[0].role,
    };
    //firmamos el token
    const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: '1d' });

    await validate(registrationSchema, req.body);
    res.send({
      status: 'ok',
      message: 'Welcome',
      data: token,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
};

module.exports = userLogin;
