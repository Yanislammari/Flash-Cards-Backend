import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class UserSchema extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
}

UserSchema.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Username cannot be empty",
      },
      notNull: {
        msg: "Username cannot be null",
      },
      len: {
        args: [3, 255],
        msg: "Username must be between 3 and 255 characters",
      }
    },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Email must be a valid email address",
      },
      notEmpty: {
        msg: "Email cannot be empty",
      },
      notNull: {
        msg: "Email cannot be null",
      },
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Password cannot be empty",
      },
      notNull: {
        msg: "Password cannot be null",
      },
      len: {
        args: [8, 255],
        msg: "Password must be at least 6 characters long",
      }
    },
  }
}, {
  sequelize,
  tableName: "users",
  modelName: "UserSchema",
  timestamps: true,
});

export default UserSchema;
