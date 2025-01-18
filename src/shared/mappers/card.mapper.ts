import CardSchema from "../../infrastructure/schemas/card.schema";
import Card from "../../domain/entities/card.entity";

const CardMapper = {
  toDomain(cardSchema: CardSchema): Card {
    return {
      id: cardSchema.id,
      category: cardSchema.category,
      question: cardSchema.question,
      answer: cardSchema.answer,
      tag: cardSchema.tag,
    };
  },

  toDomainList(cardSchemas: CardSchema[]): Card[] {
    return cardSchemas.map(this.toDomain);
  },

  async toSchema(card: Card): Promise<CardSchema> {
    return CardSchema.build({
      id: card.id,
      category: card.category,
      question: card.question,
      answer: card.answer,
      tag: card.tag,
    });
  },

  async toSchemaList(cards: Card[]): Promise<CardSchema[]> {
    return Promise.all(cards.map((card) => this.toSchema(card)));
  },
};

export default CardMapper;
