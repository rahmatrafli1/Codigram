const postRoutes = require("express").Router();
const postController = require("../controller/postController.js");
const uploadPost = require("../middleware/multerPost.js");

postRoutes.get("/", postController.getAll);
postRoutes.get("/:id", postController.detail);
postRoutes.post("/", uploadPost.single("image"), postController.post);
postRoutes.put("/:id", postController.edit);
postRoutes.delete("/:id", postController.delete);

module.exports = postRoutes;
