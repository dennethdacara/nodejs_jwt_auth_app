const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {

    // if the origin that is sending the request is allowed
    // set this header on the response to fulfil cors credentials requirement
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }

    next();
}

module.exports = credentials;