import Card from "../../domain/entities/card.entity";
import CardSchema from "../../infrastructure/schemas/card.schema";
import CardMapper from "../../shared/mappers/card.mapper";
import CardRepository from "../../infrastructure/repositories/card.repository";
import Category from "../../shared/value-objects/category";
import getDaysForCategory from "../../shared/utils/category-days";
import { calculateDaysBetween } from "../../shared/utils/date";

function isCardForToday(card: CardSchema, todayDate: Date): boolean {
  const updatedAt = new Date(card.dataValues.updated_at);
  const daysSinceUpdate = calculateDaysBetween(updatedAt, todayDate);
  return daysSinceUpdate === getDaysForCategory(card.category);
}

export async function getCardsForTodayService(todayDate: Date): Promise<Card[]> {
  try {
    const cards = await CardRepository.getAllCards();
    const cardsToday = cards.filter((card) => isCardForToday(card, todayDate));
    return CardMapper.toDomainList(cardsToday);
  }
  catch(err) {
    throw Error("Error fetching today cards");
  }
}

export async function awnserToCardService(cardId: string, isValid: boolean): Promise<Card> {
  try {
    const cardSchema = await CardRepository.getCardById(cardId);
    if(!cardSchema) {
      throw Error("Error fetching card by ID");
    }

    isValid ? cardSchema.dataValues.category++ : cardSchema.dataValues.category = Category.FIRST;
    const newCardSchema = await CardRepository.editCard(cardId, cardSchema);
    return CardMapper.toDomain(newCardSchema);
  }
  catch(err) {
    throw Error("Error awnser to card");
  } 
}
