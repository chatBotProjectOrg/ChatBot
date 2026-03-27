const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ServiceUser = require("../models/ServiceUser.model");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await ServiceUser.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  if (!["Admin", "Manager"].includes(user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  });
};
