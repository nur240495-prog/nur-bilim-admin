const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// 👉 Басты бет
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// 👉 Publish сақтау
app.post("/save", (req, res) => {
  fs.writeFileSync(
    path.join(__dirname, "public/site.html"),
    req.body.code
  );
  res.send("Saved!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});
