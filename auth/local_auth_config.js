
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const jwt_gen = require('./jwt_generator').google_jwt;

let user_model = require('../db').models.User

passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        process.nextTick(function () {
            user_model.findOne({ 'local.email': email }, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done({response:"user exists"}, false);
                } else {

                    var newUser = new user_model();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            })
        });
    }
));


passport.use('local-login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));