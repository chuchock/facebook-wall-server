const express = require("express");
const connectDB = require("./config/db");

// Create server
const app = express();

// Connect to DB
connectDB();

// Enable express.json(allow data from client) - header: application/json
app.use(express.json({ extended: true }));

// App port
const PORT = process.env.PORT || 4000;

// Principal page
app.get("/", (req, res) => {
  res.send("Facebook wall API");
});

// Import routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

// Start App
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
