const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('dotenv').config().parsed;

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "user not authorize"})
        }
        const decodedData = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decodedData;
        next()
    } catch (e) {
        return res.status(403).json({message: "user not authorize"});
    }
};