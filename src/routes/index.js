const express = require("express");
const router = express.Router();

// Basic test route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Blog API" });
});

// Here you can add more routes or import them from separate files
// Example:
// const authRoutes = require('./auth.routes');
// router.use('/auth', authRoutes);

module.exports = router;
