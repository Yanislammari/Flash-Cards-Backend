import Card from "../../domain/entities/card.entity";
import CardSchema from "../../infrastructure/schemas/card.schema";
import CardMapper from "../../shared/mappers/card.mapper";
import CardRepository from "../../infrastructure/repositories/card.repository";
import Category from "../../domain/value-objects/category";
import getDaysForCategory from "../../shared/utils/category-utils";
import { calculateDaysBetween } from "../../shared/utils/date";
import { incrementCategory } from "../../shared/utils/category-utils";

export function isCardForToday(card: CardSchema, todayDate: Date): boolean {
  const updatedAt = new Date(card.dataValues.updated_at);
  const daysSinceUpdate = calculateDaysBetween(updatedAt, todayDate);
  return daysSinceUpdate === getDaysForCategory(card.category);
}

export function isQuizzTodayDone(cards: CardSchema[], todayDate: Date): boolean {
  const lastCard = cards.sort((a, b) => new Date(b.dataValues.updated_at).getTime() - new Date(a.dataValues.updated_at).getTime())[0];
  const lastUpdatdAt = new Date(lastCard?.dataValues.updated_at);
  const daysSinceUpdate = calculateDaysBetween(lastUpdatdAt, todayDate);
  return daysSinceUpdate === 0;
}

export async function getCardsForTodayService(todayDate: Date): Promise<Card[]> {
  try {
    const cards = await CardRepository.getAllCards();

    if (isQuizzTodayDone(cards, todayDate)) {
      throw Error("Error quizz already done");
    }

    const cardsToday = cards.filter((card) => isCardForToday(card, todayDate));
    return CardMapper.toDomainList(cardsToday);
  }
  catch (err: any) {
    if (err.message === "Error quizz already done") {
      throw err;
    }
    throw Error("Error fetching today cards");
  }
}

export async function awnserToCardService(cardId: string, isValid: boolean): Promise<void> {
  try {
    const cardSchema = await CardRepository.getCardById(cardId);
    if (!cardSchema) {
      throw new Error("Error fetching card by ID");
    }

    if (cardSchema.category === Category.DONE) {
      throw new Error("Card is already done");
    }

    isValid === true ? cardSchema.category = incrementCategory(cardSchema.category) : cardSchema.category = Category.FIRST;

    if (cardSchema.category === Category.FIRST) {
      await CardRepository.syncUpdatedAt(cardId);
    }

    await CardRepository.editCard(cardId, { category: cardSchema.category });
  }
  catch (err: any) {
    if (err.message === "Error fetching card by ID" || err.message === "Card is already done") {
      throw err;
    }
    throw new Error("Error answering to card");
  }
}
