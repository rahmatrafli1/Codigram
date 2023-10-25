const postRoutes = require("express").Router();
const postController = require("../controller/postController.js");

postRoutes.get("/", postController.getAll);
postRoutes.get("/:id", postController.detail);
postRoutes.post("/", postController.post);
postRoutes.put("/:id", postController.edit);
postRoutes.delete("/:id", postController.delete);

module.exports = postRoutes;
