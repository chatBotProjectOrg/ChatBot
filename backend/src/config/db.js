const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

console.log("Connected DB:", mongoose.connection.name);

mongoose.connection.once("open", () => {
  console.log("Connected to DB:", mongoose.connection.name);
});



module.exports = connectDB;
