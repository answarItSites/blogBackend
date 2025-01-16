const Article = require("../models/articleModel");

// Get blog by ID
exports.getBlogById = async (req, res) => {
  console.log(req.params.id, "req.params.id");

  try {
    const blog = await Article.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};
