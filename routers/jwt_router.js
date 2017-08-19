var express_jwt = require('express-jwt')


const express = require('express')
const polls_controller = require('./controller')
let logger = require('winston')

module.exports.get_router = function get_router() {
    let routers = express.Router()

    const auth_sites = [
        /\/auth\/google\/\w+/,
        /\/auth\/local\/\w+/,
        '/'

    ]
    routers.use(express_jwt({ secret: process.env.JWT_SECRET }).unless({ path: auth_sites }))
    routers.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(err.status).send({ message: err.message });
            logger.error(err);
            return;
        }
        next();
    });
    return routers
}