import CardSchema from "../schemas/card.schema";

class CardRepository {
  public async getAllCards(): Promise<CardSchema[]> {
    try {
      const cards: CardSchema[] = await CardSchema.findAll();
      return cards;
    }
    catch(err) {
      throw new Error(`Error fetching cards`);
    }
  }
}

export default CardRepository;
