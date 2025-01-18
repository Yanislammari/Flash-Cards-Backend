import Card from "../../domain/entities/card.entity";
import CardRepository from "../../infrastructure/repositories/card.repository";
import CardMapper from "../../shared/mappers/card.mapper";

export async function getAllCardsService(tags?: string[]): Promise<Card[]> {
  try {
    const cardsSchema = await CardRepository.getAllCards(tags);
    const cards: Card[] = CardMapper.toDomainList(cardsSchema);
    return cards;
  }
  catch(err) {
    throw Error("Error fetching cards");
  }
}

// ajouter add card
