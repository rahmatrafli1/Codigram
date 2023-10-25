const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/user");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const userRoutes = require("./user.js");
router.use("/user", userRoutes);
const registerRoutes = require("./register.js");
router.use("/register", upload.single("image"), registerRoutes);
const postRoutes = require("./post.js");
router.use("/post", postRoutes);

module.exports = router;
