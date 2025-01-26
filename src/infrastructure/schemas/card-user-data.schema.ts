import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import CardSchema from "./card.schema";
import UserSchema from "./user.schema";

class CardUserDataSchema extends Model {
  public cardId!: string;
  public userId!: string;
}

CardUserDataSchema.init({
  cardId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: CardSchema,
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: UserSchema,
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
}, {
  sequelize,
  tableName: "card_user_data",
  modelName: "CardUserDataSchema",
  timestamps: false,
});

CardSchema.belongsToMany(UserSchema, {
  through: CardUserDataSchema,
  foreignKey: "cardId",
  otherKey: "userId",
});

UserSchema.belongsToMany(CardSchema, {
  through: CardUserDataSchema,
  foreignKey: "userId",
  otherKey: "cardId",
});

export default CardUserDataSchema;
