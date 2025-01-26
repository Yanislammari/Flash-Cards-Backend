import express from "express";
import { startDatabase } from "./infrastructure/database";
import CardSchema from "./infrastructure/schemas/card.schema";
import UserSchema from "./infrastructure/schemas/user.schema";
import cardRoutes from "./application/routes/card.routes";
import UserRoutes from "./application/routes/auth.routes";

const app = express();
app.use(express.json());

startDatabase();

CardSchema.sync();
UserSchema.sync();

app.use("/cards", cardRoutes);
app.use("/auth", UserRoutes);

export default app;
