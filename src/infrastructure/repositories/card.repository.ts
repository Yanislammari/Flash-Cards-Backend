import { Op } from "sequelize";
import CardSchema from "../schemas/card.schema";

class CardRepository {
  public static async getAllCards(tags?: string[]): Promise<CardSchema[]> {
    try {
      const cards: CardSchema[] = await CardSchema.findAll({
        where: tags ? {
          tag: {
            [Op.in]: tags,
          },
        } : {}
      });
      return cards;
    }
    catch(err) {
      throw new Error("Error fetching cards");
    }
  }

  public static async addCard(cardData: Partial<CardSchema>): Promise<CardSchema> {
    try {
      const newCard = await CardSchema.create(cardData);
      return newCard;
    }
    catch(err) {
      throw new Error("Error adding card");
    }
  }
}

export default CardRepository;
