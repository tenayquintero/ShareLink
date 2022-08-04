'use strict';
require('dotenv').config();

const getDB = require('./db');

const main = async () => {
  let connection;
  try {
    //Crear la conexión
    connection = await getDB();

    //Eliminar tablas si existen
    await connection.query(`DROP TABLE IF EXISTS votes_links`);
    await connection.query(`DROP TABLE IF EXISTS links`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    //Crear las tablas
    await connection.query(`
 
     CREATE TABLE users(
     id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
     discharge_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
     name VARCHAR(50),
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(150) NOT NULL,
     perfil VARCHAR(150),
     role ENUM("admin", "normal") DEFAULT "normal",
     active BOOLEAN DEFAULT false,
     registration_code VARCHAR(150),
     last_up_ps DATETIME,
     deleted BOOLEAN DEFAULT false
     );
 `);
    await connection.query(`
    CREATE TABLE links(
    id_link INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    url VARCHAR(250) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
   );
 `);

    await connection.query(`
   CREATE TABLE votes_links(
   id_votes INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   create_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
   vote TINYINT,
   CONSTRAINT votes_link CHECK (vote IN (1,2,3,4,5)),
   id_user INT NOT NULL,
   FOREIGN KEY (id_user) REFERENCES users(id_user),
   id_link INT NOT NULL,
   FOREIGN KEY (id_link) REFERENCES links(id_link)
)
 `);

    //Creación de usuario admin
    //Chicos la base de datos tiene por default current_timestamp por lo tanto se genera sola.
    await connection.query(`
   INSERT INTO users(name,email,password,role,active)
   VALUES("Gregorio","gregorio@mail.com",SHA2("${process.env.PASSWORD_USER_ADMIN}",512),"admin",true)
 `);
  } catch (error) {
    console.log(error);
    throw new error('Conection is not possible');
  } finally {
    //Soltar la conexión
    if (connection) {
      connection.release();
      process.exit();
    }
  }
};
main();
