const User = require("../models/user.model.js");

var users;
exports.findAll = (req, res, next) => {
    User.getAll((err, data) => {
      if (err) {
        next(err);
        return;
      }
      users = data;
      res.locals.data = data;
      next();
    });
  };

const accessTokenSecret = 'secret';
var jwt = require('jsonwebtoken');
exports.login = ( req, res, next) => {
     // Read username and password from request body
     const { username, password } = req.body;
     // Filter user by username and password from users
     const user = users.find(u => { return u.username === username && u.password === password });

     if (user) {
         // If user id found, generate an access token
         const accessToken = jwt.sign({ username: user.username}, accessTokenSecret,
             { expiresIn: '2h' });
          
          return res.status(200).json({ status: "succesfully login", 
          user:{ username: username, password: password}, accessToken: accessToken, success: true });
     } else {
         return res.send('Username or password incorrect');
     }
    next();
};
