const tokens = require("../config/tokens")

function validateUser (req,res,next) {

    const token = req.headers.authorization?.split(" ")[1];

    const payload = tokens.validateToken(token)
    
    req.user = payload;

    if (payload) return next()

    res.sendStatus(401);
}


module.exports = validateUser;