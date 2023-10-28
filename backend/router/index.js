const router = require("express").Router();
const upload = require("../middleware/multer.js");
const postController = require("../controller/postController.js");

const userRoutes = require("./user.js");
router.use("/user", userRoutes);
const registerRoutes = require("./register.js");
router.use("/register", upload.single("image"), registerRoutes);
const postRoutes = require("./post.js");
router.use("/post", postRoutes);
const loginRoutes = require("./login.js");
router.use("/login", loginRoutes);
router.get("/spost", postController.search);

module.exports = router;
