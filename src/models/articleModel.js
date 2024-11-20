const mongoose = require("mongoose");

// Define the Article schema
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    description: {
      type: String,
      required: true, // Description is required
    },
    department: {
      type: String,
      required: true, // Department is required
    },
    subDepartment: {
      type: String,
      default: "", // Set a default empty string
    },
    thumbnail: {
      type: String,
      required: true, // Thumbnail URL is required
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Article model
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
