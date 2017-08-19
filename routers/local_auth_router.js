const express = require('express')
const polls_controller = require('./controller')
var passport = require('passport');

module.exports.get_router = function get_router() {
    let routers = express.Router()

    routers.get(
        '/local/login',
        passport.authenticate('local'),
        (req, res, next) => {
            if (req.query.return) {
                req.session.oauth2return = req.query.return;
            }
            next();
        },

    );

    routers.post(
        '/local/signup',
        passport.authenticate('local-signup'),
        (req, res, next) => {
            if (req.user) {
                res.status(200).send('OK')
            }
            next();
        },

    );


    routers.get('/local/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })


    return routers
}

