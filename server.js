const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const PASSWORD = "Nur1995";

// 📁 upload папка
const upload = multer({ dest: "public/uploads/" });

// 🔐 LOGIN
app.post("/login", (req, res) => {
  if (req.body.password === PASSWORD) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

// 🧑‍💻 EDITOR
app.get("/editor", (req, res) => {
  res.sendFile(path.join(__dirname, "public/editor.html"));
});

// 🚀 Публикация
app.post("/save", (req, res) => {
  fs.writeFileSync(
    path.join(__dirname, "public/site.html"),
    req.body.code
  );
  res.send({ url: "/site.html" });
});

// 🖼 СУРЕТ ЖҮКТЕУ
app.post("/upload", upload.single("image"), (req, res) => {
  const url = "/uploads/" + req.file.filename;
  res.send({ url });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
    req.body.code
  );
  res.send({ url: "/site.html" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
