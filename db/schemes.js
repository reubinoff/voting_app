var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const min_options_prt_poll = 2

module.exports.poll_scheme = {
    name: { type: String, required: true },
    options: [{
        type: String,
        required: true,
        validate: [arrayLimit, '{PATH} under the limit of ' + min_options_prt_poll]
    }],
    results: [{
        type: String
    }],
}

function arrayLimit(val) {
    return val.length >= min_options_prt_poll;
}



