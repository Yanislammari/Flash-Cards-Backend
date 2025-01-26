import express from "express";
import { startDatabase } from "./infrastructure/database";
import CardSchema from "./infrastructure/schemas/card.schema";
import UserSchema from "./infrastructure/schemas/user.schema";
import CardUserDataSchema from "./infrastructure/schemas/card-user-data.schema";
import cardRoutes from "./application/routes/card.routes";
import UserRoutes from "./application/routes/auth.routes";

const app = express();
app.use(express.json());

startDatabase();

CardSchema.sync();
UserSchema.sync();
CardUserDataSchema.sync();

app.use("/cards", cardRoutes);
app.use("/auth", UserRoutes);

export default app;
