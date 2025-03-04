const Article = require("../models/articleModel");

// Controller to create a new article
const createArticle = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      department,
      subDepartment,
      thumbnail,
    } = req.body;

    // Detailed validation
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!shortDescription) missingFields.push("shortDescription");
    if (!description) missingFields.push("description");
    if (!department) missingFields.push("department");
    if (!thumbnail) missingFields.push("thumbnail");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields,
      });
    }

    const newArticle = new Article({
      title,
      shortDescription,
      description,
      department,
      subDepartment: subDepartment || "",
      thumbnail,
    });

    const savedArticle = await newArticle.save();

    res.status(201).json({
      success: true,
      message: "🎉 Blog post created successfully!",
      data: savedArticle,
    });
  } catch (error) {
    console.error("Article creation error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create blog post. Please try again.",
    });
  }
};

// Get all articles
const getAllArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    if (req.query.department && req.query.department !== "all") {
      query.department = req.query.department;

      if (req.query.subDepartment) {
        query.subDepartment = req.query.subDepartment;
      }
    }

    // Execute query with pagination
    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "title department subDepartment thumbnail shortDescription createdAt"
      );

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add this to your existing controller functions
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add this to your existing controller functions
const updateArticle = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      department,
      subDepartment,
      thumbnail,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !shortDescription ||
      !description ||
      !department ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title,
        shortDescription,
        description,
        department,
        subDepartment,
        thumbnail,
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: updatedArticle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Add this new controller function
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching article",
      error: error.message,
    });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  deleteArticle,
  updateArticle,
  getArticleById,
};
