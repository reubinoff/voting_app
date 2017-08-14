
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const jwt_gen = require('./jwt_generator').google_jwt;



function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    if (profile.emails && profile.emails.length) {
        email = profile.emails[0].value;
    }
    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl,
        email: email,
        jwt: ''
    };
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_PAGE
}, (accessToken, refreshToken, profile, cb) => {
    // Extract the minimal profile information we need from the profile object
    // provided by Google
    user_profile = extractProfile(profile);
    const token = jwt_gen(user_profile);
    user_profile.jwt = token
    cb(null, user_profile);
    console.log('user: '+profile.displayName+" signedin");
    //   function(accessToken, refreshToken, profile, done) {
    //        User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //          return done(err, user);
    //        });
    //   }
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});
