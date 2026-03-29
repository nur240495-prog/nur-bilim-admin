const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const PASSWORD = "Nur1995"; // 🔐 пароль

// LOGIN тексеру
app.post("/login", (req, res) => {
  if (req.body.password === PASSWORD) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

// EDITOR беті
app.get("/editor", (req, res) => {
  res.sendFile(path.join(__dirname, "public/editor.html"));
});

// САЙТ САҚТАУ
app.post("/save", (req, res) => {
  fs.writeFileSync(
    path.join(__dirname, "public/site.html"),
    req.body.code
  );
  res.send({ url: "/site.html" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
