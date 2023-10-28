const postRoutes = require("express").Router();
const postController = require("../controller/postController.js");
const { auth } = require("../middleware/auth.js");
const uploadPost = require("../middleware/multerPost.js");

postRoutes.get("/", postController.getAll);
postRoutes.get("/user", auth, postController.getAllUser);
postRoutes.get("/:id", postController.detail);
postRoutes.post("/", auth, uploadPost.single("image"), postController.post);
postRoutes.put("/:id", auth, uploadPost.single("image"), postController.edit);
postRoutes.delete("/:id", auth, postController.delete);

module.exports = postRoutes;
