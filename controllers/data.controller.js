const Data = require("../models/data.model.js");
const faker = require('faker');

var realtimeData = [], dbDayData = [], dbBusData = [], dbDriverData = [], dbRouteData = [];
var dayData = [], busData = [], driverData = [], routeData = [];
var check = false, isChange = false, isNew = false;
var dataObj = [];

const fs = require("fs");

dataObj = generateBoarding();


fs.writeFileSync('./data/analysis2.json', JSON.stringify(dataObj, '\t'), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

fs.closeSync(2);

fs.readFile("./data/analysis2.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  const data = JSON.parse(jsonString);
  for (var i = 0; i < data.data.length; i++) {
    realtimeData.push(data.data[i]);
  }

  console.log("JSON Data: ", realtimeData);
  for (var i = 0; i < realtimeData.length; i++) {
    var index = 0;
    bool = false;
    change = false;
    let element = {
      date: "",
      bus_id: 0,
      driver_id: 0,
      route_id: 0,
      total_usage_count: 0,
      total_usage_amount: 0,
    };
    for (var j = 0; j < dayData.length; j++) {
      if (realtimeData[i].date == dayData[j].date) {
        if (realtimeData[i].driver_id == dayData[j].driver_id &&
          realtimeData[i].bus_id == dayData[j].bus_id &&
          realtimeData[i].route_id == dayData[j].route_id &&
          realtimeData[i].total_usage_count == dayData[j].total_usage_count &&
          realtimeData[i].total_usage_amount == dayData[j].total_usage_amount) {
          bool = false;
          change = true;
          break;
        }
        else {
          bool = true;
          change = true;
          index = j;
          break;
        }
      }
    }
    if (dayData.length == 0) {
      element.date = realtimeData[i].date;
      element.bus_id = realtimeData[i].bus_id;
      element.driver_id = realtimeData[i].driver_id;
      element.route_id = realtimeData[i].route_id;
      element.total_usage_count = realtimeData[i].total_usage_count;
      element.total_usage_amount = realtimeData[i].total_usage_amount;
      dayData.push(element);
    }
    else if (bool && change) {
      var count = realtimeData[i].total_usage_count;
      var amount = realtimeData[i].total_usage_amount;
      count = count + dayData[index].total_usage_count;
      amount = amount + dayData[index].total_usage_amount;
      dayData[index].total_usage_count = count;
      dayData[index].total_usage_amount = amount;
    }
    else if (!bool && !change) {
      element.date = realtimeData[i].date;
      element.bus_id = realtimeData[i].bus_id;
      element.driver_id = realtimeData[i].driver_id;
      element.route_id = realtimeData[i].route_id;
      element.total_usage_count = realtimeData[i].total_usage_count;
      element.total_usage_amount = realtimeData[i].total_usage_amount;
      dayData.push(element);
    }
  }
  busData = groupJsonData(busData, realtimeData, "bus");
  driverData = groupJsonData(driverData, realtimeData, "driver");
  routeData = groupJsonData(routeData, realtimeData, "route");

});

exports.findData = (req, res, next) => {
  Data.getDay((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    for (var i = 0; i < res.locals.data.length; i++) {
      dbDayData.push(res.locals.data[i]);
    }
  });
  Data.getBus((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    for (var i = 0; i < res.locals.data.length; i++) {
      dbBusData.push(res.locals.data[i]);
    }
  });
  Data.getDriver((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;

    for (var i = 0; i < res.locals.data.length; i++) {
      dbDriverData.push(res.locals.data[i]);
    }
  });
  Data.getRoute((err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    for (var i = 0; i < res.locals.data.length; i++) {
      dbRouteData.push(res.locals.data[i]);
    }
    next();
  });
};
exports.create = (req, res, next) => {
  const data = new Data({
    date: "",
    media_number: "",
    bus_id: "",
    driver_id: "",
    route_id: "",
    total_usage_count: "",
    total_usage_amount: "",
    isExist: false,
  });

  for (var i = 0; i < dayData.length; i++) {
    data.date = dayData[i].date;
    data.media_number = 0;
    data.bus_id = dayData[i].bus_id;
    data.driver_id = dayData[i].driver_id;
    data.route_id = dayData[i].route_id;
    data.total_usage_count = dayData[i].total_usage_count;
    data.total_usage_amount = dayData[i].total_usage_amount;
    for (var j = 0; j < dbDayData.length; j++) {
      if (dbDayData[j].date != null && dbDayData[j].date == data.date) {
        data.isExistDate = true;
      }
    }
    Data.increaseDay(data, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.data = data;
      next();
    });
  }
  for (var i = 0; i < busData.length; i++) {
    data.date = busData[i].date;
    data.media_number = 0;
    data.bus_id = busData[i].bus_id;
    data.driver_id = busData[i].driver_id;
    data.route_id = busData[i].route_id;
    data.total_usage_count = busData[i].total_usage_count;
    data.total_usage_amount = busData[i].total_usage_amount;
    for (var j = 0; j < dbBusData.length; j++) {
      if (dbBusData[j] != null && dbBusData[j].date == data.date && dbBusData[j].bus_id == data.bus_id) {
        data.isExistDate = true;
        data.isExistBus = true;
      }
    }
    Data.increaseBus(data, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.data = data;
      next();
    });
  }
  for (var i = 0; i < driverData.length; i++) {
    data.date = driverData[i].date;
    data.media_number = 0;
    data.bus_id = driverData[i].bus_id;
    data.driver_id = driverData[i].driver_id;
    data.route_id = driverData[i].route_id;
    data.total_usage_count = driverData[i].total_usage_count;
    data.total_usage_amount = driverData[i].total_usage_amount;
    for (var j = 0; j < dbDriverData.length; j++) {
      if (dbDriverData[j] != null & dbDriverData[j].date == data.date && dbDriverData[j].driver_id == data.driver_id) {
        data.isExistDate = true;
        data.isExistDriver = true;
      }
    }
    Data.increaseDriver(data, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.data = data;
      next();
    });
  }
  for (var i = 0; i < routeData.length; i++) {
    data.date = routeData[i].date;
    data.media_number = 0;
    data.bus_id = routeData[i].bus_id;
    data.driver_id = routeData[i].driver_id;
    data.route_id = routeData[i].route_id;
    data.total_usage_count = routeData[i].total_usage_count;
    data.total_usage_amount = routeData[i].total_usage_amount;
    for (var j = 0; j < dbRouteData.length; j++) {
      if (dbRouteData[j] != null && dbRouteData[j].date == data.date && dbRouteData[j].route_id == data.route_id) {
        data.isExistDate = true;
        data.isExistRoute = true;
      }
    }
    Data.increaseRoute(data, (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.data = data;
      next();
    });
  }
};

exports.getDailyData = (req, res, next) => {
  var date = formatDate();
  Data.getToday(date, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
}
exports.getDailyBusData = (req, res, next) => {
  var date = formatDate();
  Data.getDailyBus(date, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;

    next();
  });
}
exports.getDailyDriverData = (req, res, next) => {
  var date = formatDate();
  Data.getDailyDriver(date, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
}
exports.getDailyRouteData = (req, res, next) => {
  var date = formatDate();
  Data.getDailyRoute(date, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.locals.data = data;
    next();
  });
}

function groupJsonData(data, realtimeData, operation) {
  for (var i = 0; i < realtimeData.length; i++) {
    var index = 0;
    check = false;
    isChange = false;
    isNew = false;
    let element = {
      date: "",
      bus_id: 0,
      driver_id: 0,
      route_id: 0,
      total_usage_count: 0,
      total_usage_amount: 0,
    };
    for (var j = 0; j < data.length; j++) {
      if (realtimeData[i].date == data[j].date) {
        if (
          realtimeData[i].driver_id == data[j].driver_id &&
          realtimeData[i].bus_id == data[j].bus_id &&
          realtimeData[i].route_id == data[j].route_id &&
          realtimeData[i].total_usage_count ==
          data[j].total_usage_count &&
          realtimeData[i].total_usage_amount == data[j].total_usage_amount
        ) {
          check = false;
          isChange = true;
          break;
        }
        else if ((operation == "bus" && realtimeData[i].bus_id == data[j].bus_id) ||
          (operation == "driver" && realtimeData[i].driver_id == data[j].driver_id) ||
          (operation == "route" && realtimeData[i].route_id == data[j].route_id)) {
          check = true;
          isChange = true;
          isNew = false;
          index = j;
          break;
        } else {
          check = true;
          isNew = true;
          isChange = true;
          index = j;
        }
      }
    }
    if (check && isChange && !isNew) {
      var count = realtimeData[i].total_usage_count;
      var amount = realtimeData[i].total_usage_amount;
      count = count + data[index].total_usage_count;
      amount = amount + data[index].total_usage_amount;
      data[index].total_usage_count = count;
      data[index].total_usage_amount = amount;
    }
    if (data.length == 0 || (check && isNew && isChange)) {
      element.date = realtimeData[i].date;
      element.bus_id = realtimeData[i].bus_id;
      element.driver_id = realtimeData[i].driver_id;
      element.route_id = realtimeData[i].route_id;
      element.total_usage_count = realtimeData[i].total_usage_count;
      element.total_usage_amount = realtimeData[i].total_usage_amount;
      data.push(element);
    }
    else if (!check && !isNew && !isChange) {
      element.date = realtimeData[i].date;
      element.bus_id = realtimeData[i].bus_id;
      element.driver_id = realtimeData[i].driver_id;
      element.route_id = realtimeData[i].route_id;
      element.total_usage_count = realtimeData[i].total_usage_count;
      element.total_usage_amount = realtimeData[i].total_usage_amount;
      data.push(element);
    }
  }
  return data;
}
function formatDate() {
  var d = new Date(Date.now()),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

function generateBoarding() {

  let data = []

  for (var i = 0; i < 10; i++) {

      let takedate = faker.date.between('2019-01-01', '2021-01-01');
      let route_id = faker.random.number({ min: 1, max: 100 });
      let bus_id = faker.random.number({ min: 1, max: 50 });
      let driver_id = faker.random.number({ min: 1, max: 50 });
      let total_usage_count = faker.random.number({ min: 250, max: 750 })
      let total_usage_amount = total_usage_count * faker.random.number({ min: 1, max: 3 });

      var day = takedate.getDay() + 1;
      var month = takedate.getMonth() + 1;
      var year = takedate.getFullYear();

      if (month < 10) {
          month = "0" + month;
      }
      if (day < 10) {
          day = "0" + day;
      }

      let date = year + "-" + month + "-" + day;

      data.push({
          "date": date,
          "route_id": route_id,
          "bus_id": bus_id,
          "driver_id": driver_id,
          "total_usage_count": total_usage_count,
          "total_usage_amount": total_usage_amount
      });
  }
  return { "data": data };
}

