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

  public static async getCardById(cardId: string): Promise<CardSchema | null> {
    try {
      const card = await CardSchema.findByPk(cardId);
      return card;
    }
    catch(err) {
      throw new Error("Error fetching card by ID");
    }
  }

  public static async addCard(cardData: Partial<CardSchema>): Promise<CardSchema> {
    try {
      const newCard = await CardSchema.create(cardData.dataValues);
      return newCard;
    }
    catch(err : any) {
      throw new Error("Error adding card");
    }
  }

  public static async editCard(cardId: string, updatedData: Partial<CardSchema>): Promise<CardSchema> {
    try {
      const card = await CardSchema.findByPk(cardId);
      if(!card) {
        throw new Error("Error fetching card by ID");
      }

      await card.update(updatedData);
      return card;
    }
    catch(err) {
      throw new Error("Error editing card");
    }
  }

  public static async syncUpdatedAt(cardId: string): Promise<void> {
    try {
      const card = await CardSchema.findByPk(cardId);
      if(!card) {
        throw new Error("Error fetching card by ID");
      }
      
      const storeTag = card.tag;
      await card.update({ tag: "/" }, { silent: false }); // Solution car il parrait impossible de modifier le updated_at pour l'instant
      await card.update({ tag: storeTag }, { silent: false });
    }
    catch(err) {
      throw new Error("Error editing card");
    }
  }
}

export default CardRepository;
