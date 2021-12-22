const jwt = require("jsonwebtoken");
const joi = require("joi");

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const schema = joi
        .object({
          authorization: joi.string().required(),
        })
        .options({
          abortEarly: false,
        });
      const validate = await schema.validate({ authorization: token });
      if (validate.error) {
        req.error = validate.error.message;
        next();
      } else {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.body.decodedToken = decodedToken;
        next();
      }
    } catch (error) {
      res.send({
        status: 500,
        message: "invalid token",
        data: error,
      });
    }
  },
  authValidation: async (req, res, next) => {
    try {
      const body = {
        email: req.body.email,
        password: req.body.password,
      };
      const schema = joi
        .object({
          email: joi.string().email().required(),
          password: joi.string().required(),
        })
        .options({ abortEarly: false });
      const validate = await schema.validate(body);
      if (validate.error) {
        req.error = validate.error.message;
        next();
      } else {
        next();
      }
    } catch (error) {
      res.send({
        status: 500,
        message: "somthing wrong",
        data: error,
      });
    }
  },
};

module.exports = authMiddleware;
