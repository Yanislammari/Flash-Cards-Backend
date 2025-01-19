import express from "express";
import { getAllCards, addCard } from "../controllers/card.controller";
import { getCardsForToday } from "../controllers/quizz.controller";

const router = express.Router();

router.get("/", getAllCards);
router.get("/quizz", getCardsForToday);
router.post("/", addCard);

export default router;
