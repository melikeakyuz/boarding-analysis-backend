
// Require dev dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//Assertion style
const should = chai.should();

chai.use(chaiHttp);

let user = {
    username: "melike",
    password: "123456"
  };
  
let token;

beforeEach(done => {
    chai.request(app)
    .post("/login")
    .send(user)
    .end((err, res) => {
        token = res.body.accessToken;
        res.should.have.status(200);
        done();
    });
});

describe('/GET daily data', () => {
    it('it should Get all daily data', (done) => {
        chai.request(app)
        .get('/daily/date')
        .set("Authorization", token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('code').eq(0);
            res.body.should.have.property('message').eq('success');
            done();
        });
    });
});
describe('/GET daily data for bus', () => {
    it('it should Get all daily data for bus', (done) => {
        chai.request(app)
        .get('/daily/bus')
        .set("Authorization", token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('code').eq(0);
            res.body.should.have.property('message').eq('success');
            done();
        });
    });
});
describe('/GET daily data for driver', () => {
    it('it should Get all daily data for driver', (done) => {
        chai.request(app)
        .get('/daily/driver')
        .set("Authorization", token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('code').eq(0);
            res.body.should.have.property('message').eq('success');
            done();
        });
    });
});
describe('/GET daily data for route', () => {
    it('it should Get all daily data for route', (done) => {
        chai.request(app)
        .get('/daily/route')
        .set("Authorization", token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('code').eq(0);
            res.body.should.have.property('message').eq('success');
            done();
        });
    });
});
describe('/POST daily data', () => {
    it('it should post the new daily data info', (done) => {
        const newData = {
            date: "2020-08-30",
            media_number: 0,
            bus_id: 4,
            driver_id: 5,
            route_id:70,
            total_usage_count:50,
            total_usage_amount:200
        };

        chai.request(app)
        .post('/daily/update')
        .set("Authorization", token)
        .send(newData)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('code').eq(0);
            res.body.should.have.property('message').eq('success');
            done();
        });
    });
});

