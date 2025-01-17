import CardSchema from "../../infrastructure/schemas/card.schema";
import Card from "../../domain/entities/card.entity";

const CardMapper = {
  toDomain(cardSchema: CardSchema): Card {
    return {
      id: cardSchema.id,
      category: cardSchema.category,
      question: cardSchema.question,
      answer: cardSchema.answer,
      tag: cardSchema.tag
    };
  },

  toDomainList(cardSchemas: CardSchema[]): Card[] {
    return cardSchemas.map(this.toDomain);
  },
};

export default CardMapper;
