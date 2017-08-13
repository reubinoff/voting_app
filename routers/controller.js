var logger = require('winston');
const _ = require('lodash');
const polls_data_layer = require('../db').polls_data_layer

function get(req, res, next) {
    polls_data_layer.get(req.query)
        .then((records) => {
            res.json(records);
        }, (err) => { return next(err) })
        .catch(next)

}


function insert(req, res, next) {
    req.db_component.insert(req.body)
        .then((records) => {
            res.json(records);
            res.locals.insert = records
            next()
        }, (err) => { return next(err) })
        .catch(next)
}



function del(req, res, next) {
    req.db_component.delete(req.params.id)
        .then((records) => {
            res.json(records);
            next()
        }, (err) => { return next(err) })
        .catch(next)

}

function update(req, res, next) {
    req.db_component.update_by_id(req.params.id, req.body)
        .then((records) => {
            res.json(records);
            next()
        }, (err) => { return next(err) })
        .catch(next)


}



module.exports.get = get;
module.exports.insert = insert;
module.exports.update = update;
module.exports.delete = del;
