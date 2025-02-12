import { Op } from "sequelize";
import CardSchema from "../schemas/card.schema";

class CardRepository {
  private static instance: CardRepository;

  private constructor() { }

  public static getInstance(): CardRepository {
    if (!CardRepository.instance) {
      CardRepository.instance = new CardRepository();
    }
    return CardRepository.instance;
  }

  public async getAllCards(tags?: string[]): Promise<CardSchema[]> {
    try {
      return await CardSchema.findAll({
        where: tags ? { tag: { [Op.in]: tags } } : {},
      });
    } catch (err) {
      throw new Error("Error fetching cards");
    }
  }

  public async getCardById(cardId: string): Promise<CardSchema | null> {
    try {
      return await CardSchema.findByPk(cardId);
    } catch (err) {
      throw new Error("Error fetching card by ID");
    }
  }

  public async addCard(cardData: Partial<CardSchema>): Promise<CardSchema> {
    try {
      return await CardSchema.create(cardData.dataValues);
    } catch (err) {
      throw new Error("Error adding card");
    }
  }

  public async editCard(cardId: string, updatedData: Partial<CardSchema>): Promise<CardSchema> {
    try {
      const card = await CardSchema.findByPk(cardId);
      if (!card) {
        throw new Error("Error fetching card by ID");
      }
      await card.update(updatedData);
      return card;
    } catch (err) {
      throw new Error("Error editing card");
    }
  }

  public async syncUpdatedAt(cardId: string): Promise<void> {
    try {
      const card = await CardSchema.findByPk(cardId);
      if (!card) {
        throw new Error("Error fetching card by ID");
      }
      const storeTag = card.tag;
      await card.update({ tag: "/" }, { silent: false });
      await card.update({ tag: storeTag }, { silent: false });
    } catch (err) {
      throw new Error("Error editing card");
    }
  }
}

export default CardRepository.getInstance();
