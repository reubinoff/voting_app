var winston = require('winston');
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var _ = require('lodash')


var get = function (query) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false
        };
        Poll.find(query,usersProjection)
            .then((polls) => {
                resolve(polls);
            })
            .catch((err) => { reject(err) });
    });
}


var update_by_id = function (id, poll_doc) {
    return new Promise(function (resolve, reject) {
        res = Poll.findOneAndUpdate({ _id: id }, { $set: poll_doc }, {
            new: true,
            fields: {
                name: true,
                description: true,
                args: true,
                return_val: true
            }
        }, function (err, doc) {
            if (err) return reject(err)
            if (_.isNull(doc)) { return reject(new errors.InfinityNotFoundError(poll_doc.name)) }
            resolve(doc)
        });
    })
}

var insert = function (poll_doc) {
    return new Promise(function (resolve, reject) {
        Poll.find({ name: poll_doc.name }, function (err, doc) {
            if (err) { return reject(err) }
            if (_.size(doc) == 0) {
                var new_poll = new poll(poll_doc)
                new_Poll.save()
                    .then((rec) => { resolve(rec) })
                    .catch((err) => {
                        return reject(new errors.InfinityInvalidFormatError(JSON.stringify(err.errors), "poll"))
                    });
            } else {
                reject(new errors.InfinityKeyExistError(doc[0]._id))
            }

        })
    });
}


var del = function (id) {
    return new Promise(function (resolve, reject) {
        Poll.findByIdAndRemove(id, function (err, res) {
            if (err) { return reject(err) }
            if (_.isNull(res)) { return reject(new errors.InfinityNotFoundError(id)) }
            resolve(res);
        })
    });
}


module.exports.get = get
module.exports.insert = insert
module.exports.update_by_id = update_by_id

module.exports.delete = del
