const registerRoutes = require("express").Router();
const registerController = require("../controller/registerController.js");

registerRoutes.post("/", registerController.register);

module.exports = registerRoutes;
