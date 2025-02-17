const express = require("express");
const router = express.Router();
const { getBlogDetails } = require("../controllers/articleDetailsController");

// Route to get blog details
router.get("/blogDetails/:blogId", getBlogDetails);

module.exports = router;
