

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
const qs = require('qs')
chai.use(chaiHttp);


let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var Poll = mongoose.model('Poll');


describe('poll', () => {
    beforeEach((done) => { //Before each test we empty the database
        Poll.remove({}, (err) => {
            done();
        });
    });
    
    /*
     * Test the /GET route
     */
    describe('/GET poll', () => {
        it('it should GET all the polls', (done) => {
            chai.request(server)
                .get('/api/polls')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
        it('it should GET a poll by the given id', (done) => {
            let poll = new Poll({
                user: "test",
                name: "my_first_poll",
                options: ["1, 2, 3"]
            })
            poll.save((err, _poll) => {
                const query = {
                    name: poll.name
                }
                chai.request(server)
                    .get('/api/polls/?' + qs.stringify(query))
                    .send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.equal(1)
                        done();
                    });
            });

        });
    });
})