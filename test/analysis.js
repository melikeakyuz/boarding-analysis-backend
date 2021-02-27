
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
   
 describe('/GET analyzes', () => {
    it('it should Get all analyzes', (done) => {
        chai.request(app)
        .get('/analysis/findAll')
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
describe('/GET analysis bus', () => {
    it('it should Get all analysis bus', (done) => {
        chai.request(app)
        .get('/analysis/bus')
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
describe('/GET analysis day', () => {
    it('it should Get all analysis day', (done) => {
        chai.request(app)
        .get('/analysis/day')
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
describe('/GET analysis driver', () => {
    it('it should Get all analysis driver', (done) => {
        chai.request(app)
        .get('/analysis/driver')
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
describe('/GET analysis route', () => {
    it('it should Get all analysis route', (done) => {
        chai.request(app)
        .get('/analysis/route')
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
describe('/POST analysis', () => {
    it('it should post the analysis info', (done) => {
        const analysis = {
            date: "2020-08-30",
            route_id: "5",
            bus_id: "12",
            driver_id: "1",
            company_id:"4",
            total_usage_count:"50",
            total_usage_amount:"200"
        };

        chai.request(app)
        .post('/analysis/add')
        .set("Authorization", token)
        .send(analysis)
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
describe('/PUT/:bus_id', () => {
    it("should not update the analysis info", (done) => {
        const analysis = {
            date: "2020-08-30",
            route_id: "5",
            bus_id: "12",
            driver_id: "1",
            company_id:"4",
            total_usage_count:"50",
            total_usage_amount:"200"
        };

        const bus_id = 12;

         chai.request(app)
         .put('/analysis/update/'+bus_id)
         .set("Authorization", token)
         .send(analysis)
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
describe('/DELETE/:bus_id', function() {
    it('it should delete the analysis with bus id', function(done) {
        const bus_id = 12;
       
        chai.request(app)
        .delete('/analysis/delete/' + bus_id)
        .set("Authorization", token)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            res.should.have.status(200);
            done();
        });
    });
});
