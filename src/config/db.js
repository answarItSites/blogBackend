const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // Log Mongo URI for confirmation
    console.log("Mongo URI: ", mongoURI);

    if (!mongoURI) {
      console.error("MONGODB_URI is not defined in environment variables");
      process.exit(1);
    }

    // Connect to MongoDB without deprecated options
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
