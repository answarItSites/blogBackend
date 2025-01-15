const express = require("express");
const router = express.Router();
const { getBlogById } = require("../controllers/blogController");

// Route to fetch blog by ID
router.get("/:id", getBlogById);

module.exports = router;
