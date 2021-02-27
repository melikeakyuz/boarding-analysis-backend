const dbInfo = require('./db.config');
const mySql = require('mysql');


var connection = mySql.createConnection({
    host     : dbInfo.HOST,
    user     : dbInfo.USERNAME,
    password : dbInfo.PASSWORD,
    database : dbInfo.DB_NAME,
    dateStrings : dbInfo.dateStrings,
  });

  connection.connect(); 
  
  module.exports= connection;