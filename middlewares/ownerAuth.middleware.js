const jwt = require("jsonwebtoken");
const generateToken = require("../configs/envVariables");

const Ownerauthmiddleware = (req, res, next) => {
    const Ownertoken = req.cookies.Ownertoken;

    if (!Ownertoken) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(Ownertoken, generateToken.accessToken);
        req.owner = decoded;  // attach user data here
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


module.exports = Ownerauthmiddleware;