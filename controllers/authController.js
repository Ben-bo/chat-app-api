const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user: userModel } = require("../models");
const authController = {
  login: async (req, res) => {
    try {
      let status = 200;
      let message = "SUCCESS";
      let data = {};

      const isUserExist = await userModel.findOne({ email: req.body.email });
      if (!isUserExist) {
        message = "User not found";
        status = 500;
      } else {
        const passwordCorrect = bcrypt.compareSync(
          req.body.password,
          isUserExist.dataValues.password
        );
        if (!passwordCorrect) {
          message = "Incorrect password";
          status = 500;
        } else {
          const token = await jwt.sign(
            isUserExist.dataValues,
            process.env.SECRET_KEY
          );
          data = token;
        }
      }

      res.status(status).json({
        status,
        message,
        data,
      });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  },
};
module.exports = authController;
