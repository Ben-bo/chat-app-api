const { login, register } = require("../controllers/authController");
const { authValidation } = require("../middlewares/authMiddleware");

const route = require("express").Router();
route.post("/login", authValidation, login);
route.post("/register", register);
module.exports = route;
