const dotEnv = require('dotenv');
dotEnv.config();

const envVariables = {
    PORT: process.env.PORT,
    mongodbURI: process.env.MONGODB_URI,
    accessToken: process.env.ACCESS_TOKEN,

    cloudinary: {
        cloudName: process.env.CLOUD_NAME,
        apiKey: process.env.CLOUD_KEY,
        apiSecret: process.env.CLOUD_SECRET,
    },
};



Object.freeze(envVariables);


module.exports = envVariables;