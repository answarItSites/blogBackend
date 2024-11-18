const express = require("express");
const { createArticle } = require("../controllers/articleController"); // Import the controller
const router = express.Router();

// Route to create a new article
router.post("/articles", createArticle); // Use the controller function

module.exports = router;
