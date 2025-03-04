const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const articleRoutes = require("./routes/articleRoutes");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const blogDetilasRoutes = require("./routes/articleDetailsRoutes");
const mongoose = require("mongoose");
const routes = require("./routes/index");

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.mongo_url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", routes);
app.use("/api/postArticle", articleRoutes);
app.use("/api", userRoutes);
app.use("/api", blogDetilasRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Error handler middleware
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
