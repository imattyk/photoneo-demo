const express = require("express");
require("dotenv").config();
const path = require("path");

const PORT = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
