import Card from "../../domain/entities/card.entity";
import CardRepository from "../../infrastructure/repositories/card.repository";
import CardMapper from "../../shared/mappers/card.mapper";

class CardService {
  public async getAllCards(tags?: string[]): Promise<Card[]> {
    try {
      const cardsSchema = await CardRepository.getAllCards(tags);
      const cards: Card[] = CardMapper.toDomainList(cardsSchema);
      return cards
    }
    catch(err) {
      throw new Error("Error fetching cards");
    }
  }
}

export default CardService;
