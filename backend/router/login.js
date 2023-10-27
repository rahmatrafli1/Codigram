const loginRoutes = require("express").Router();
const loginController = require("../controller/loginController.js");

loginRoutes.post("/", loginController.login);

module.exports = loginRoutes;
