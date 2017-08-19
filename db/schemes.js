var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const min_options_prt_poll = 2

module.exports.poll_scheme = new Schema({
    user: { type: String, required: true },
    name: { type: String, required: true },
    options: [{
        type: String,
        required: true,
        validate: [arrayLimit, '{PATH} under the limit of ' + min_options_prt_poll]
    }],
    results: [{
        type: String
    }],
})

user_model = new Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
})

// methods ======================
// generating a hash
user_model.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user_model.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


function arrayLimit(val) {
    return val.length >= min_options_prt_poll;
}

module.exports.user_model = user_model


