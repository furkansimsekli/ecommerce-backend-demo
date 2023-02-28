const { expressjwt: jwt } = require("express-jwt");


function validateJwt(req, res, next) {
    jwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"]
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },    // TODO: /api/v1 comes from env, use generic expression
            `${process.env.API_URL}/users/login`,
            `${process.env.API_URL}/users/register`,
        ]
    })(req, res, next);
}

function errorHandler(err, req, res, next) {
    if (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    validateJwt,
    errorHandler
}
