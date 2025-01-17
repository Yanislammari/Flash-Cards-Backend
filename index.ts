import app from "./src/app";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server Running : ${PORT}`);
});
