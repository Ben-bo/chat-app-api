const { user, chat: chatModel } = require("../models");
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
