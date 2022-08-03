"use strict";
const Joi = require("joi");

const registrationSchema = Joi.object().keys({
    email: Joi.string().required().email().max(100).error(
        new Error('The email must be a valid email')
    ),
    password: Joi.string().required().min(6).max(20).error(
        new Error("Password length not correct, must be between 6-20")
    ),
});


module.exports ={registrationSchema};