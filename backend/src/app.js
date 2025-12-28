const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("./config/env");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
