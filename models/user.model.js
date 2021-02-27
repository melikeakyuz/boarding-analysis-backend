const sql = require("../db.js");

// constructor
const User = function (user) {
    this.username = user.username;
    this.password = user.password;
  };
  const columns = [
    `username`,
    `password`
  ]

  const tableName = `users`;

  User.getAll = result => {
    sql.query("SELECT " + columns.join(',') + " FROM " + tableName + "", (err, data) => {
      result(err, data);
    });
  };

  module.exports = User;