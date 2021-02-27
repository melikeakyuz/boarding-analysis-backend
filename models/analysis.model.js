const sql = require("../db.js");

const date=formatDate();
// constructor
const Analysis = function (analysis) {
  this.date = analysis.date;
  this.route_id = analysis.route_id;
  this.bus_id = analysis.bus_id;
  this.driver_id = analysis.driver_id;
  this.company_id = analysis.company_id;
  this.total_usage_count = analysis.total_usage_count;
  this.total_usage_amount = analysis.total_usage_amount;
};

const columns = [
  `date`,
  `route_id`,
  `bus_id`,
  `driver_id`,
  `company_id`,
  `total_usage_count`,
  `total_usage_amount`,
]

const tableName = `binis_analiz`;

Analysis.getAll = result => {
  sql.query("SELECT " + columns.join(',') + " FROM " + tableName + "", (err, data) => {
    result(err, data);
  });
};

Analysis.create = (newAnalysis, result) => {
  //Date.now()
  sql.query('INSERT INTO ' + tableName + '(' + columns.join(',') 
  + ') VALUES (?,?,?,?,?,?,?)', Object.values(newAnalysis), (err, data) => {
    result(err, data);
  });
};

Analysis.remove = (id, result) => {
  sql.query("DELETE FROM " + tableName + " WHERE bus_id =?", id, (err, data) => {
    result(err, data);
  });
};

Analysis.updateById = (id, analysis, result) => {
  sql.query("UPDATE " + tableName + " SET ? WHERE bus_id = " + id, analysis, (err, data) => {
    result(err, data);
  }
  );
};

Analysis.getRouteTotal = (result) => {
  var start_date = date.startDate;
  var end_date = date.endDate; 
  sql.query(`SELECT ${columns[1]} AS Route, SUM(${columns[6]}) AS TotalUsageAmt FROM ` + tableName
    + ` WHERE ${columns[0]} BETWEEN '` + start_date + `' AND '` + end_date
    + `' GROUP BY ${columns[1]} HAVING SUM(${columns[6]}) 
    ORDER BY SUM(${columns[6]}) DESC LIMIT 1`, (err, data) => {
      result(err, data);

    });
};

Analysis.getMostUsageDay = (result) => {
  var start_date = date.startDate;
  var end_date = date.endDate;
  sql.query(`SELECT ${columns[0]} AS TheMostAmountDay, SUM(${columns[6]}) AS TotalUsageAmt FROM ` 
  + tableName + ` WHERE ${columns[0]} BETWEEN '` + start_date + `' AND '`  + end_date 
  + `' GROUP BY ${columns[0]} HAVING SUM(${columns[6]}) ORDER BY SUM(${columns[6]}) 
  DESC LIMIT 1`, (err, data) => {
    result(err, data);
  });
};

Analysis.findBusTotalUsage = (result) => {
  var start_date = date.startDate;
  var end_date = date.endDate;
  sql.query(`SELECT ${columns[2]} AS busID, SUM(${columns[6]}) AS TotalUsageAmt FROM ` 
  + tableName + ` WHERE ${columns[0]} BETWEEN '` + start_date + `' AND '` + end_date
   + `' GROUP BY ${columns[2]} HAVING SUM(${columns[6]}) ORDER BY SUM(${columns[6]})
    DESC LIMIT 1`, (err, data) => {
    result(err, data);
  });
};

Analysis.findDriverTotalUsage = (result) => {
  var start_date = date.startDate;
  var end_date = date.endDate;
  sql.query(`SELECT ${columns[3]} AS driverID, SUM(${columns[6]}) AS TotalUsageAmt FROM ` 
  + tableName + ` WHERE ${columns[0]} BETWEEN '` + start_date + `' AND '` + end_date 
  + `' GROUP BY ${columns[3]} HAVING SUM(${columns[6]}) ORDER BY SUM(${columns[6]}) 
  DESC LIMIT 1`, (err, data) => {
    result(err, data);
  });
};
function formatDate() {
  var date={
    startDate:"",
    endDate:""
  };
  var d = new Date(Date.now()),
      month = '' +(d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
  { 
      endMonth = '0' + month;
      startMonth = '0' +(month-2);
  }
  if (day.length < 2) 
      day = '0' + day;
 
  date.startDate=[year, startMonth, day].join('-');
  date.endDate=[year, endMonth, day].join('-');
  return date;
}
module.exports = Analysis;