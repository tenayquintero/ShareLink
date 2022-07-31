"use strict";
const Joi = require("joi");

const registrationSchema = Joi.object().keys({
    email: Joi.string().required().email().max(100),
    password: Joi.string().required().min(6).max(20).error(
        new Error("Password corto, debe ser entre 6 y 10 parámetros")
    ),
});

module.exports ={registrationSchema};