import express from "express";
import { startDatabase } from "./infrastructure/database";
import CardSchema from "./infrastructure/schemas/card.schema";
import cardRoutes from "./application/routes/card.routes";

const app = express();
app.use(express.json());

startDatabase();

CardSchema.sync();

app.use("/cards", cardRoutes);

export default app;
