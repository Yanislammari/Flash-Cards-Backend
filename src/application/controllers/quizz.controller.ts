import { Request, Response } from "express";
import { getCardsForTodayService, awnserToCardService } from "../services/quizz.service";

export async function getCardsForToday(req: Request, res: Response) {
  try {
    const todayDateQuery = req.query.date;
    const todayDate: Date = new Date(todayDateQuery as string);
    const cards = await getCardsForTodayService(todayDate);
    return res.status(200).json(cards);
  }
  catch(err: any) {
    if(err.message === "Error fetching today cards") {
      return res.status(400).json({ error: "Error fetching today cards"});
    }
    else if(err.message === "Error quizz already done") {
      return res.status(400).json({ error: "Error quizz already done"});
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}

export async function awnserToCard(req: Request, res: Response) {
  try {
    const cardId = req.params.cardId;
    const isValid = req.body.isValid;
    await awnserToCardService(cardId, isValid);
    return res.status(204).json({ message: "Answer has been taken into account" });
  }
  catch(err: any) {
    if(err.message === "Error fetching card by ID") {
      return res.status(404).json({ error: "Card not found" });
    }
    else if(err.message === "Card is already done") {
      return res.status(400).json({ error: "Card is already done" });
    }
    else if(err.message === "Error answering to card") {
      return res.status(400).json({ error: "Error answering to card" });
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}
