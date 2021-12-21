const { login } = require("../controllers/authController");

const route = require("express").Router();
route.post("/login", login);
module.exports = route;
