const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        .status(409) // 409 Conflict status for existing resource
        .json({
          success: false,
          message: "This email is already in use. Please try another.",
        });
    }

    // Create a new user
    const user = new User({ name, email, phone, password, role });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);

    // Handle MongoDB unique constraint error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res
        .status(409)
        .json({ success: false, message: "This email is already registered." });
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Export controller
module.exports = { signupUser, loginUser };
