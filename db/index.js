const mongoose = require('mongoose')

module.exports = {
    polls_data_layer: require('./polls_db'),
    models:{
        User :mongoose.model('User'),
        Poll :mongoose.model('Poll')
    }
}