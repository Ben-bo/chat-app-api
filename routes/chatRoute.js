const { listMessage } = require("../controllers/chatController");
const { verifyToken } = require("../middlewares/authMiddleware");

const route = require("express").Router();
route.get("/list/:sendId/:recId", verifyToken, listMessage);
module.exports = route;
