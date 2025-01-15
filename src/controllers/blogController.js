const Blog = require("../models/Blog"); // Assuming you have a Blog model set up

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};
