import { Request, Response } from "express";
import CardService from "../services/card.service";

export async function getAllCards(req: Request, res: Response) {
  try {
    const { tags } = req.query;
    const cards = await CardService.getAllCards(tags as string[]);
    return res.status(200).json(cards);
  }
  catch(err: any) {
    if(err.name === "Error fetching cards") {
      return res.status(200).json({ error: "Error fetching cards" });
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}
