import express from "express";
import { startDatabase } from "./infrastructure/database";
import CardSchema from "./infrastructure/schemas/card.schema";

const app = express();
app.use(express.json());

startDatabase();

CardSchema.sync();

export default app;
