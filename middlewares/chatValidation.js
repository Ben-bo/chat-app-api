const joi = require("joi");
const chatValidation = {
  validate: async (req, res, next) => {
    const errorCek = req.error;
    if (errorCek) {
      next();
    } else {
      const body = {
        reciever_id: req.body.reciever_id,
      };
      const schema = joi
        .object({
          reciever_id: joi.number().required(),
        })
        .options({ abortEarly: false });
      const validate = await schema.validate(body);

      if (validate.error) {
        req.error = validate.error.message;
        next();
      } else {
        next();
      }
    }
  },
};
module.exports = chatValidation;
