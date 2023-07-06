const jwt = require('jsonwebtoken');
const logger = require('../utils/logger')
require('dotenv').config()

// Middleware to verify and authorize user based on token
const verifyJwt = () => {
    return (req, res, next) => {
        // Get token from authorization header
        const token = req.headers.authorization.split(' ')[1];

        //if token is valid, authorize
        if(token){
            jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
                if(err) {
                    logger.info(err.message);
                    res.redirect('/login');
                } else {
                    if(decodedToken) {
                        next();
                    } else {
                        res.redirect('/login');
                        return res.status(403).send('Access denied. User Unauthorized');
                    }
                }
            });
        } else {
            res.redirect('/login');
            return res.status(401).send('Access denied. No token provided.');
        }
    };
};

module.exports = verifyJwt;
