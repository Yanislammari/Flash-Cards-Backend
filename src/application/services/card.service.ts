import Card from "../../domain/entities/card.entity";
import CardRepository from "../../infrastructure/repositories/card.repository";
import CardSchema from "../../infrastructure/schemas/card.schema";
import CardMapper from "../../shared/mappers/card.mapper";
import CardUserDataRepository from "../../infrastructure/repositories/card-user-data.repository";
import { decodeTokenService } from "./auth.service";

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

export async function addCardService(token: string, card: Card): Promise<Card> {
  try {
    const user = await decodeTokenService(token);
    const cardSchema: CardSchema = await CardMapper.toSchema(card);
    const newCardSchema: CardSchema = await CardRepository.addCard(cardSchema);
    await CardUserDataRepository.addCardUserAssociation(newCardSchema.id, user.id);
    const newCard: Card = CardMapper.toDomain(newCardSchema);
    return newCard;
  }
  catch(err) {
    throw Error("Error adding card");
  }
}
