const Blog = require("../models/articleModel");

// Controller to get blog details by ID
const getBlogDetails = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getBlogDetails };
