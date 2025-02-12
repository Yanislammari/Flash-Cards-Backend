import CardUserDataSchema from "../schemas/card-user-data.schema";

class CardUserDataRepository {
  private static instance: CardUserDataRepository;

  private constructor() { }

  public static getInstance(): CardUserDataRepository {
    if (!CardUserDataRepository.instance) {
      CardUserDataRepository.instance = new CardUserDataRepository();
    }
    return CardUserDataRepository.instance;
  }

  public async addCardUserAssociation(cardId: string, userId: string): Promise<void> {
    try {
      await CardUserDataSchema.create({ cardId, userId });
    }
    catch (err) {
      throw new Error("Error creating card-user association");
    }
  }
}

export default CardUserDataRepository.getInstance();
