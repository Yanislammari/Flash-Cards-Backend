import { Request, Response } from "express";
import Card from "../../domain/entities/card.entity";
import cardValidation from "../../domain/validations/card.validation";
import { getAllCardsService, addCardService } from "../services/card.service";

export async function getAllCards(req: Request, res: Response) {
  try {
    const tagsQuery = req.query.tags;
    let tags: string[] | undefined;
    
    switch(typeof tagsQuery) {
      case "string": {
        tags = tagsQuery.split(",").map(tag => tag.trim());
        break;
      }
      case "undefined": {
        tags = undefined;
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

export async function addCard(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const { error, value } = cardValidation.validate(req.body);
    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const card: Card = value;
    const newCard = await addCardService(token, card);
    return res.status(201).json(newCard);
  }
  catch(err: any) {
    if(err.message === "Error adding card") {
      return res.status(200).json({ error: "Error adding card" });
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}
