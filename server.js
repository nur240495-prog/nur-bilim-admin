const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// SAVE CODE
app.post("/save", (req, res) => {
  const code = req.body.code;

  fs.writeFileSync(path.join(__dirname, "public/site.html"), code);

  res.send("Saved!");
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
