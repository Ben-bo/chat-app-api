const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user: userModel } = require("../models");
const authController = {
  login: async (req, res) => {
    let status = 200;
    let message = "SUCCESS";
    let data = {};
    try {
      console.log(req.body.email);
      const isUserExist = await userModel.findOne({
        where: { email: req.body.email },
      });
      console.log(isUserExist);
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
          const token = jwt.sign(
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
  register: async (req, res) => {
    try {
      let status = 200;
      let message = "SUCCESS";
      let data = {};
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const isUserExist = await userModel.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!isUserExist) {
        data = await userModel.create({
          email: req.body.email,
          name: req.body.name,
          password: hashedPassword,
        });
      } else {
        message = "email already exist";
        status = 500;
      }
      const { password, ...other } = data.dataValues;
      res.status(status).json({
        status,
        message,
        data: other,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
module.exports = authController;
