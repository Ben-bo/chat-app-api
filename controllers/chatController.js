const { user, chat: chatModel, inbox } = require("../models");
const { Op } = require("sequelize");
const chatController = {
  listMessage: async (req, res) => {
    try {
      const idUser = req.body.decodedToken.id;
      const reciever = req.params.recId;
      console.log(idUser);
      const sender = req.params.sendId;
      const list = await chatModel.findAll({
        include: [
          {
            model: user,
            as: "dataSender",
            attributes: ["id", "name", "email"],
          },
          {
            model: user,
            as: "dataReciever",
            attributes: ["id", "name", "email"],
          },
        ],
        where: {
          [Op.or]: [
            { [Op.and]: [{ sender_id: sender }, { reciever_id: reciever }] },
            { [Op.and]: [{ sender_id: reciever }, { reciever_id: sender }] },
          ],
        },
        order: [["id", "ASC"]],
        attributes: ["id", "sender_id", "msg"],
      });
      if (list === null) {
        res.send({
          message: "do data",
        });
      }
      res.send({
        list,
      });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  },
  createMessage: async (req, res) => {
    try {
      const sender = req.body.decodedToken.id;
      const reciever = req.body.reciever_id;
      const cekDataInbox = await inbox.findOne({
        where: {
          [Op.or]: [
            { [Op.and]: [{ sender_id: sender }, { reciever_id: reciever }] },
            { [Op.and]: [{ sender_id: reciever }, { reciever_id: sender }] },
          ],
        },
      });
      if (cekDataInbox) {
        const dataInbox = {
          sender_id: sender,
          reciever_id: reciever,
          lastmsg: req.body.msg,
        };
        await inbox.update(dataInbox, {
          where: {
            [Op.or]: [
              { [Op.and]: [{ sender_id: sender }, { reciever_id: reciever }] },
              { [Op.and]: [{ sender_id: reciever }, { reciever_id: sender }] },
            ],
          },
        });
      } else {
        const dataInbox = {
          sender_id: sender,
          reciever_id: reciever,
          lastmsg: req.body.msg,
        };
        await inbox.create(dataInbox);
      }

      const data = {
        sender_id: req.body.decodedToken.id,
        reciever_id: req.body.reciever_id,
        msg: req.body.msg,
      };

      const message = await chatModel.create(data);
      res.send({
        message,
      });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  },
  replyMsg: async (req, res) => {
    try {
      const reciever = req.params.recId;
      const data = {
        sender_id: req.body.decodedToken.id,
        reciever_id: reciever,
        msg: req.body.msg,
      };
      const reply = await chatModel.create(data);
      res.send({
        reply,
      });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  },
  inbox: async (req, res) => {
    try {
      const userId = req.body.decodedToken.id;
      const list = await chatModel.findAll({
        include: [
          {
            model: user,
            as: "dataSender",
            attributes: ["id", "name", "email"],
          },
          {
            model: user,
            as: "dataReciever",
            attributes: ["id", "name", "email"],
          },
        ],
        where: {
          [Op.or]: [{ reciever_id: userId }, { sender_id: userId }],
        },
        order: [["id", "ASC"]],
        attributes: ["id", "sender_id", "msg"],
      });
      if (list === null) {
        res.send({
          message: "do data",
        });
      }
      res.send({
        list,
      });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  },
};

module.exports = chatController;
