const Article = require("../models/articleModel");

// Controller to create a new article
const createArticle = async (req, res) => {
  const { title, description, thumbnail, link } = req.body;

  try {
    const newArticle = new Article({
      title,
      description,
      thumbnail,
      link,
    });

    await newArticle.save(); // Save the article to the database
    res.status(201).json(newArticle); // Respond with the created article
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};

// Export the controller functions
module.exports = {
  createArticle,
};
