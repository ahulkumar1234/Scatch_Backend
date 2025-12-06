const mongoose = require('mongoose');
const envVariables = require('./envVariables');

const connectDB = async () => {
    try {
        await mongoose.connect(envVariables.mongodbURI, {
            dbName: "scatch_fullstack_project",
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;