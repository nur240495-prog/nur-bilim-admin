const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: "/uploads/" + req.file.filename
  });
});
const fs = require("fs");

app.use(express.json());

app.post("/save", (req, res) => {
  fs.writeFileSync("public/site.html", req.body.code);
  res.send("saved");
});
app.get("/images", (req, res) => {
  const files = fs.readdirSync("uploads");
  res.json(files.map(f => ({ url: "/uploads/" + f })));
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started"));
