const jwt = require("jsonwebtoken");
const { SECRET } = require("./envs");

function generateToken (payload) {
    return jwt.sign(payload,SECRET,{ expiresIn: "1d"})
}

function validateToken (token) {
    return jwt.verify(token,SECRET)
}

module.exports = { generateToken, validateToken }