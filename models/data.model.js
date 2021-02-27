const sql = require("../db.js");

// constructor
const Data = function (data) {
  this.date = data.date;
  this.media_number = data.media_number;
  this.bus_id = data.bus_id;
  this.driver_id = data.driver_id;
  this.route_id = data.route_id;
  this.total_usage_count = data.total_usage_count;
  this.total_usage_amount = data.total_usage_amount;
  this.isExistDate = data.isExistDate;
  this.isExistRoute = data.isExistRoute;
  this.isExistBus = data.isExistBus;
  this.isExistDriver = data.isExistDriver;
};
const columns = [
  `date`,
  `total_usage_count`,
  `total_usage_amount`,
]

Data.getDay = result => {
  sql.query("SELECT " + columns.join(',') + " FROM date", (err, data) => {
    result(err, data);
  });
};
Data.getToday =(date, result)=> {
  sql.query("SELECT " + columns.join(',') + " FROM date WHERE date='"+date+"'", (err, data) => {
    result(err, data);
  });
};
Data.getDailyBus=(date, result)=> {
  sql.query("SELECT " + columns.join(',')+",bus_id" + " FROM bus WHERE date='"+date+"'", (err, data) => {
    result(err, data);
  });
};
Data.getDailyDriver=(date, result)=> {
  sql.query("SELECT " + columns.join(',')+",driver_id" + " FROM driver WHERE date='"+date+"'", (err, data) => {
    result(err, data);
  });
};
Data.getDailyRoute=(date, result)=> {
  sql.query("SELECT " + columns.join(',')+",route_id" + " FROM route WHERE date='"+date+"'", (err, data) => {
    result(err, data);
  });
};

Data.getBus = result => {
  sql.query("SELECT " + columns.join(',')+",bus_id" + " FROM bus", (err, data) => {
    result(err, data);
  });
};
Data.getDriver = result => {
  sql.query("SELECT " + columns.join(',')+",driver_id" + " FROM driver", (err, data) => {
    result(err, data);
  });
};
Data.getRoute = result => {
  sql.query("SELECT " + columns.join(',')+",route_id" + " FROM route", (err, data) => {
    result(err, data);
  });
};

Data.increaseDay = (newData, result) => {
 
  if(newData.isExistDate)
      sqlQuery = "UPDATE date SET total_usage_count = total_usage_count+" + newData.total_usage_count+","+ 
      "total_usage_amount = total_usage_amount+"+ newData.total_usage_amount+" WHERE date = '"+newData.date+"'";
  else  
      sqlQuery = "INSERT INTO date"  + "(" +columns.join(',') + ") VALUES ('"+
      newData.date+"',"+newData.total_usage_count+","+newData.total_usage_amount+")";  
      
  sql.query(sqlQuery, (err, data) => {
    result(err, data);
  });

};
Data.increaseBus = (newData, result) => {
  if(newData.isExistDate && newData.isExistBus)
      sqlQuery = "UPDATE bus SET total_usage_count = total_usage_count+" + newData.total_usage_count+","+ 
      "total_usage_amount = total_usage_amount+"+ newData.total_usage_amount+" WHERE date = '"+newData.date
      +"' AND bus_id="+newData.bus_id;
  else  
      sqlQuery = "INSERT INTO bus"  + "(" +columns.join(',') + ",bus_id) VALUES ('"
      +newData.date+"',"+newData.total_usage_count+","+newData.total_usage_amount+","+newData.bus_id+")";

  sql.query(sqlQuery, (err, data) => {
    result(err, data);
  });
};
Data.increaseDriver = (newData, result) => {
  if(newData.isExistDate && newData.isExistDriver)
    sqlQuery = "UPDATE driver SET total_usage_count = total_usage_count+" + newData.total_usage_count+","+ 
    "total_usage_amount = total_usage_amount+"+ newData.total_usage_amount+" WHERE date = '"+newData.date
    +"' AND driver_id="+newData.driver_id;
  else  
    sqlQuery = "INSERT INTO driver"  + "(" +columns.join(',') + ",driver_id) VALUES ('"
    +newData.date+"',"+newData.total_usage_count+","+newData.total_usage_amount+","+newData.driver_id+")";

  sql.query(sqlQuery, (err, data) => {
    result(err, data);
  });
};
Data.increaseRoute= (newData, result) => {
  //Date.now()
  if(newData.isExistDate && newData.isExistRoute)
  sqlQuery = "UPDATE route SET total_usage_count = total_usage_count+" + newData.total_usage_count+","+ 
  "total_usage_amount = total_usage_amount+"+ newData.total_usage_amount+" WHERE date = '"+newData.date
  +"' AND route_id="+newData.route_id;
  else  
    sqlQuery = "INSERT INTO route"  + "(" +columns.join(',') + ",route_id) VALUES ('"
    +newData.date+"',"+newData.total_usage_count+","+newData.total_usage_amount+","+newData.route_id+")";

  sql.query(sqlQuery, (err, data) => {
    result(err, data);
  });
};

module.exports = Data;