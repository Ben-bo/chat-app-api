const {
  listMessage,
  createMessage,
  replyMsg,
  inbox,
} = require("../controllers/chatController");
const { verifyToken } = require("../middlewares/authMiddleware");

const route = require("express").Router();
route.get("/chat/:sendId/:recId", verifyToken, listMessage);
route.post("/chat", verifyToken, createMessage);
route.post("/chat/:recId", verifyToken, replyMsg);
route.get("/chat/", verifyToken, inbox);
module.exports = route;
