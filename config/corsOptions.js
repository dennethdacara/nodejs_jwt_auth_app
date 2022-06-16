// Cross Origin Resource Sharing
// open to public (everyone can use it)
// app.use(cors()); 

const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        // if domain is in the allowedOrigins
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // callback(error, same origin);
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;