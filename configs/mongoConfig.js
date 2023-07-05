const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Pead-api-db",
    })
        .then(() => logger.info("Database Connection is ready..."))
        .catch((err) => logger.error("DB CONNECTION ERROR: ", err));
}

module.exports = connectDB
