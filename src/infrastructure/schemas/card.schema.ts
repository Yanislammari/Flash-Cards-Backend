import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Category from "../../shared/value-objects/category";

class CardSchema extends Model {
  public id!: string;
  public category!: Category;
  public question!: string;
  public answer!: string;
  public tag!: string;
}

CardSchema.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  category: {
    type: DataTypes.ENUM(...Object.values(Category)),
    allowNull: false,
    validate: {
      isIn: {
        args: [Object.values(Category)],
        msg: "Invalid Category",
      },
      notEmpty: {
        msg: "Category cannot be empty",
      },
      notNull: {
        msg: "Category cannot be null",
      },
    },
  },
  question: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Question cannot be empty",
      },
      notNull: {
        msg: "Question cannot be null",
      },
    },
  },
  answer: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Answer cannot be empty",
      },
      notNull: {
        msg: "Answer cannot be null",
      },
    },
  },
  tag: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Tag cannot be empty",
      },
      notNull: {
        msg: "Tag cannot be null",
      },
    },
  }
},{
  sequelize,
  tableName: "cards",
  modelName: "CardSchema",
  timestamps: true,
});

export default CardSchema;
