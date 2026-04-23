const Joi = require('joi');

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      error: error.details[0].message,
      success: false
    });
  }

  next();
};

const signinValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      error: error.details[0].message,
      success: false
    });
  }

  next();
};

module.exports = {
  signupValidation,
  signinValidation
};