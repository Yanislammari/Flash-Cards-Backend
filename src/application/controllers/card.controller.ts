import { Request, Response } from "express";
import { getAllCardsService } from "../services/card.service";

export async function getAllCards(req: Request, res: Response) {
  try {
    const tagsQuery = req.query.tags;
    let tags: string[];
    
    switch(typeof tagsQuery) {
      case "string": {
        tags = tagsQuery.split(",").map(tag => tag.trim());
        break;
      }
      default: {
        const queryArray = tagsQuery as [];
        tags = queryArray.map(tag => tag as string);
      }
    }

    const cards = await getAllCardsService(tags);
    return res.status(200).json(cards);
  }
  catch(err: any) {
    if(err.message === "Error fetching cards") {
      return res.status(200).json({ error: "Error fetching cards" });
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}
