const userRoutes = require("express").Router();
const userController = require("../controller/userController.js");
const upload = require("../middleware/multer.js");

userRoutes.get("/", userController.getAll);
userRoutes.get("/:id", userController.detail);
userRoutes.put("/:id", upload.single("image"), userController.edit);
userRoutes.delete("/:id", userController.delete);

module.exports = userRoutes;
