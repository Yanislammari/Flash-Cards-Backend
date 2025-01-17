import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseName = process.env.DATABASE_NAME as string;
const databaseUsername = process.env.DATABASE_USERNAME as string;
const databasePassword = process.env.DATABASE_PASSWORD as string;
const databaseIpAdress = process.env.DATABASE_IP_ADRESS as string;
const databasePort = parseInt(process.env.DATABASE_PORT as string, 10);

export const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
  host: databaseIpAdress,
  port: databasePort,
  dialect: "mysql",
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  timezone: "-00:00",
  dialectOptions: {
    timezone: 'Z',
    dateStrings: true
  },
  logging: false
});

export const startDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Succesfully connect to Database");
  }
  catch(err) {
    throw Error("Failed to connect to Database");
  }
};
