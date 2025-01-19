import Card from "../../domain/entities/card.entity";
import CardSchema from "../../infrastructure/schemas/card.schema";
import CardMapper from "../../shared/mappers/card.mapper";
import CardRepository from "../../infrastructure/repositories/card.repository";
import Category from "../../shared/value-objects/category";
import getDaysForCategory from "../../shared/utils/category-days";
import { calculateDaysBetween } from "../../shared/utils/date";
import { incrementCategory } from "../../shared/value-objects/category";

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

export async function awnserToCardService(cardId: string, isValid: boolean): Promise<void> {
  try {
    const cardSchema = await CardRepository.getCardById(cardId);
    if(!cardSchema) {
      throw new Error("Error fetching card by ID");
    }

    if(cardSchema.category === Category.DONE) {
      throw new Error("Card is already done");
    }

    isValid ? cardSchema.category = incrementCategory(cardSchema.category) : cardSchema.category = Category.FIRST;
    await CardRepository.editCard(cardId, { category: cardSchema.category });
  }
  catch(err: any) {
    if(err.message === "Error fetching card by ID" || err.message === "Card is already done") {
      throw err;
    }
    throw new Error("Error answering to card");
  }
}
