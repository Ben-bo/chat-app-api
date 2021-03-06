"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class inbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      inbox.belongsTo(models.user, {
        foreignKey: "sender_id",
        // foreignKey: "reciever_id",
        as: "dataSender",
      });
      inbox.belongsTo(models.user, {
        // foreignKey: "sender_id",
        foreignKey: "reciever_id",
        as: "dataReciever",
      });
    }
  }
  inbox.init(
    {
      reciever_id: DataTypes.INTEGER,
      sender_id: DataTypes.INTEGER,
      lastmsg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "inbox",
    }
  );
  return inbox;
};
