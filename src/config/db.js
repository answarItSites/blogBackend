const mongoose = require("mongoose");
require("dotenv").config(); // Make sure this is at the top of the file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // Log Mongo URI to check if it's correctly loaded
    console.log("Mongo URI: ", mongoURI);

    if (!mongoURI) {
      console.error("MONGODB_URI is not defined in environment variables");
      process.exit(1); // Exit the app if Mongo URI is not defined
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
