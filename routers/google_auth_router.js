const express = require('express')
const polls_controller = require('./controller')
var passport = require('passport');

module.exports.get_router = function get_router() {
    let routers = express.Router()

    routers.get(
        '/google/login',
        (req, res, next) => {
            if (req.query.return) {
                req.session.oauth2return = req.query.return;
            }
            next();
        },

        // Start OAuth 2 flow using Passport.js
        passport.authenticate('google', { scope: ['email', 'profile'] })
    );


    routers.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        (req, res) => {
            const redirect = req.session.oauth2return || '/';
            delete req.session.oauth2return;
            res.redirect(redirect);
        })

    routers.get('/google/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })


    // routers.get('/auth/google',
    //     passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


    return routers
}

