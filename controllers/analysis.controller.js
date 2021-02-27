const Analysis = require("../models/analysis.model.js");

exports.findAll = (req, res, next) => {
  Analysis.getAll((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
};

exports.create = (req, res, next) => {

  // Create an analysis
  const analysis = new Analysis({
    date: req.body.date,
    route_id: req.body.route_id,
    bus_id: req.body.bus_id,
    driver_id: req.body.driver_id,
    company_id: req.body.company_id,
    total_usage_count: req.body.total_usage_count,
    total_usage_amount: req.body.total_usage_amount,
  });

  // Save analysis in the database
  Analysis.create(analysis, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
};

exports.delete = (req, res, next) => {

  var busID = req.params.bus_id;

  Analysis.remove(busID, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
};

exports.update = (req, res, next) => {

  var busID = req.params.bus_id; 
  Analysis.updateById(busID, new Analysis(req.body), (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
};

exports.findRouteTotalUsage = (req, res, next) => {
  
  Analysis.getRouteTotal( (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
};

exports.findMostUsageDay = (req, res, next) => {

  Analysis.getMostUsageDay((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
};

exports.findBusTotalUsage = (req, res, next) => {

  Analysis.findBusTotalUsage((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
};

exports.findDriverTotalUsage = (req, res, next) => {

  Analysis.findDriverTotalUsage((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
};
