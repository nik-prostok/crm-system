const expressJwt = require('express-jwt');
const { secret } = require('../config/secret.json');

let authorize = (roles = []) => {
    // Can be single role or roles array
    if(typeof roles === 'string'){
        roles = [roles];
    }

    return [
    expressJwt({ secret: secret, requestProperty: 'auth' }),
    (err, req, res, next) => {
        if(roles.length && !roles.includes(req.auth.role)){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        /*if (err.name === 'UnauthorizedError') {
            res.status(401).send('invalid token...');
        }*/
        next();
    }
    ];
}; 

module.exports = authorize;