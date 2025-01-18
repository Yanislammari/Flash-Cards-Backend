import joi from "joi";
import Category from "../../shared/value-objects/category";

const cardValidation = joi.object({
  category: joi.string().valid(...Object.values(Category)).default(Category.FIRST).optional(),
  question: joi.string().required(),
  answer: joi.string().required(),
  tag: joi.string().required()
});

export default cardValidation;
