const userRoutes = require("express").Router();
const userController = require("../controller/userController.js");

userRoutes.get("/", userController.getAll);
userRoutes.get("/:id", userController.detail);
userRoutes.put("/:id", userController.edit);
userRoutes.delete("/:id", userController.delete);

module.exports = userRoutes;
