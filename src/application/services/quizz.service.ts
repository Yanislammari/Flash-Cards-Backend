import Card from "../../domain/entities/card.entity";
import CardSchema from "../../infrastructure/schemas/card.schema";
import CardMapper from "../../shared/mappers/card.mapper";
import CardRepository from "../../infrastructure/repositories/card.repository";
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
