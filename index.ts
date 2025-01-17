import app from "./src/app";
import dotenv from "dotenv";
import { startDatabase } from "./src/infrastructure/database";

dotenv.config();
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server Running : ${PORT}`);
});
