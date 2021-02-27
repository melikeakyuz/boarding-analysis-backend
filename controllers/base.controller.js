exports.startSession = (req, res, next) => {

    res.locals.startDate = req.body.start_date;
    res.locals.endDate = req.body.end_date;
    next();
};

exports.authCheck = ( req, res, next) => {
        var jwt = require('jsonwebtoken');
        const authHeader = req.headers.authorization;
        const accessTokenSecret = 'secret';
        
        if (authHeader) {
            const token = authHeader;
            var decoded  =  jwt.decode(token);
            jwt.verify(token, accessTokenSecret, function(err, decoded) {
                if (err) {
                     res.sendStatus(403);
                }
                else{
                    next();
                }
            });
        } 
        else {
            res.sendStatus(403);
        }
};

exports.endSession = (req, res, next) => {
    var result = {
        code: 0,
        message: "success",
        data: res.locals.data        
    };
    if(result.data)
    {
        res.json(result);
    }
    else
    {
        res.json({ code: 1, message: "Failed"});
    }
    
    res.end();
}; 