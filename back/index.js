const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(express.static("build"));
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT | 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
