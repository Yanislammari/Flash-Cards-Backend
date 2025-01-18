import express from "express";
import { getAllCards, addCard } from "../controllers/card.controller";

const router = express.Router();

router.get("/", getAllCards);
router.post("/", addCard);

export default router;
