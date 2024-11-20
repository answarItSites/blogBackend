const express = require("express");
const router = express.Router();
const {
  createArticle,
  getAllArticles,
  deleteArticle,
  updateArticle,
  getArticleById,
} = require("../controllers/articleController");

router.post("/", createArticle);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.delete("/:id", deleteArticle);
router.put("/:id", updateArticle);

module.exports = router;
