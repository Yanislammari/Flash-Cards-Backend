import Card from "../../domain/entities/card.entity";
import CardSchema from "../../infrastructure/schemas/card.schema";
import CardRepository from "../../infrastructure/repositories/card.repository";
import getDaysForCategory from "../../shared/utils/category-days";
import { calculateDaysBetween } from "../../shared/utils/date";

function isCardForToday(card: CardSchema, todayDate: Date): boolean {
  const updatedAt = new Date(card.dataValues.updated_at);
  const daysSinceUpdate = calculateDaysBetween(updatedAt, todayDate);
  return daysSinceUpdate === getDaysForCategory(card.category);
}

export async function getCardsForToday(todayDate: Date): Promise<Card[]> {
  const cards = await CardRepository.getAllCards();
  const cardsToday = cards.filter((card) => isCardForToday(card, todayDate));
  return cardsToday;
}
