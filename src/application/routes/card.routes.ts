import express from "express";
import { getAllCards } from "../controllers/card.controller";

const router = express.Router();

router.get("/", getAllCards);

export default router;
