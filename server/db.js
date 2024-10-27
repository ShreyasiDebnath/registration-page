const { DB_NAME } = require("./constants");
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n Mongodb connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongo Connection error", error);
        process.exit(1);
    }
};

module.exports = connectDB;
