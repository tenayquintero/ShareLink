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

const registrationLink = Joi.object().keys({
    url: Joi.string().required().error(
        new Error('The url must be valid')
    ),
    title: Joi.string().required().error(
        new Error("title is required")
    ),
    description: Joi.string().required().error(
        new Error("description is required")
    ),
});

module.exports ={registrationSchema, registrationLink};