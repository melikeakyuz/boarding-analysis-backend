const analysis = require("../controllers/analysis.controller.js");
const base = require("../controllers/base.controller.js");
const auth = require("../controllers/auth.controller.js");
const data = require("../controllers/data.controller.js");

module.exports = app => {

  app.all("*", auth.findAll,data.findData);
  app.post("/login", auth.login);
  app.all("*", base.startSession, base.authCheck);

  //all routes
  app.post('/daily/update',data.create);
  app.get('/daily/date',data.getDailyData);
  app.get('/daily/bus',data.getDailyBusData);
  app.get('/daily/driver',data.getDailyDriverData);
  app.get('/daily/route',data.getDailyRouteData);
  app.get('/analysis/findAll', analysis.findAll);
  app.get('/analysis/route', analysis.findRouteTotalUsage);
  app.get('/analysis/bus', analysis.findBusTotalUsage);
  app.get('/analysis/driver', analysis.findDriverTotalUsage);
  app.get('/analysis/day', analysis.findMostUsageDay);
  app.post('/analysis/add', analysis.create);
  app.delete('/analysis/delete/:bus_id', analysis.delete);
  app.put('/analysis/update/:bus_id', analysis.update);
  

  app.all("*", base.endSession);

  app.use(function (err, req, res, next) {
       console.log("app.use global error ", err);
        res.sendStatus(500)({
        message: "Error"           
      });
  
    var result = {
      code: err.code,
      message: err.message
    };

    res.json(result);
    res.end();
  });

};