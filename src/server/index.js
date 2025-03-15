const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8001;

// إعدادات الـ Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

// تخزين البيانات
let projectData = {};

// نقطة الوصول للصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});

// جلب البيانات المخزنة
app.get("/all", (req, res) => {
  res.json(projectData);
});

// استقبال البيانات من العميل وتخزينها
app.post("/projectData", (req, res) => {
  projectData = req.body;
  res.status(200).json(projectData);
});

// تشغيل الخادم
const appServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = appServer;

