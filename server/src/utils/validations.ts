import Joi from "joi";

export const registerValidation = (data: {
  email: string;
  password: string;
}) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,10}$"))
      .required(),
  });

  return schema.validate(data);
};

export const loginValidation = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
