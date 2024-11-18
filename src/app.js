const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const articleRoutes = require("../src/routes/articleRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);
app.use("/api", articleRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
