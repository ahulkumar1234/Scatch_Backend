const cloudinary = require("cloudinary").v2;
const envVariables = require('./envVariables')

cloudinary.config({
    cloud_name: envVariables.cloudinary.cloudName,
    api_key: envVariables.cloudinary.apiKey,
    api_secret: envVariables.cloudinary.apiSecret,
});

module.exports = cloudinary;
