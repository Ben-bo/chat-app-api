const {
  listMessage,
  createMessage,
  replyMsg,
  inbox,
} = require("../controllers/chatController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/chatValidation");

const route = require("express").Router();
route.get("/chat/:sendId/:recId", verifyToken, listMessage);
route.post("/chat", verifyToken, validate, createMessage);
route.post("/chat/:recId", verifyToken, validate, replyMsg);
route.get("/chat/", verifyToken, inbox);
module.exports = route;
