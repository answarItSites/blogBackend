const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const articleRoutes = require("./routes/articleRoutes");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const blogDetilasRoutes = require("./routes/articleDetailsRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api", routes); // General routes
app.use("/api/article", articleRoutes); // Article-specific routes
app.use("/api/user", userRoutes); // User-specific routes
app.use("/api/details", blogDetilasRoutes); // Article details-specific routes

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
