import { Request, Response } from "express";
import { getCardsForTodayService } from "../services/quizz.service";

export async function getCardsForToday(req: Request, res: Response) {
  try {
    const todayDateQuery = req.query.date;
    const todayDate: Date = new Date(todayDateQuery as string);
    const cards = await getCardsForTodayService(todayDate);
    return res.status(200).json(cards);
  }
  catch(err: any) {
    if(err.message === "Error fetching today cards") {
      return res.status(400).json("Error fetching today cards");
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}
