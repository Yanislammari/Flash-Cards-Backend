import express from "express";
import { getAllCards, addCard } from "../controllers/card.controller";
import { getCardsForToday, awnserToCard } from "../controllers/quizz.controller";

const router = express.Router();

router.get("/", getAllCards);
router.get("/quizz", getCardsForToday);
router.post("/", addCard);
router.patch("/:cardId/answer", awnserToCard);

export default router;
