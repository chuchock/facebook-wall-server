const express = require("express");
const connectDB = require("./config/db");

// Create server
const app = express();

// Connect to DB
connectDB();

// App port
const PORT = process.env.PORT || 4000;

// Principal page
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Start App
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
