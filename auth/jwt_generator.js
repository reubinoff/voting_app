var jwt_token = require('jsonwebtoken')

module.exports.google_jwt = function(profile){
    const {id, displayName, image, email} = profile;
    const token = jwt_token.sign({id, displayName, image, email }, process.env.JWT_SECRET);
    return token;
}

