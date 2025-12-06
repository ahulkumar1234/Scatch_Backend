const jwt = require("jsonwebtoken");
const generateToken = require("../configs/envVariables");

const authmiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, generateToken.accessToken);
        req.user = decoded;  // attach user data here
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


module.exports = authmiddleware;