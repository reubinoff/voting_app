const express = require('express')
const polls_controller = require('./controller')


module.exports.get_router = function get_router(){
    let routers = express.Router()

    routers.get('/', polls_controller.get)
    routers.post('/polls/:poll_id', polls_controller.update)
    routers.delete('/polls/:poll_id', polls_controller.delete)
    routers.put('./polls', polls_controller.insert)


    return routers
}