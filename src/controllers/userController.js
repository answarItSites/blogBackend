const User = require("../models/userModel");

// Handle user signup
const signupUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  // Validate request
  if (!name || !email || !phone || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Create a new user
    const user = new User({ name, email, phone, password, role });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Export controller
module.exports = { signupUser };
