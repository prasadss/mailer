const Joi = require("joi");
function validateMail(mail) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    toEmail: Joi.string().email().required(),
    fromEmail: Joi.string().email().required(),
    content: Joi.string().required(),
    subject: Joi.string().required(),
  });
  return schema.validate(mail);
}
module.exports = {
  validateMail,
};
