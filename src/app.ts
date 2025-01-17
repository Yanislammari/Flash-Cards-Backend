import express from "express";
import { startDatabase } from "./infrastructure/database";

const app = express();
app.use(express.json());

startDatabase();

export default app;
