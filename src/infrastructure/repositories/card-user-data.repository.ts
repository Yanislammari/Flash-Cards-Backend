import CardUserDataSchema from "../schemas/card-user-data.schema";

class CardUserDataRepository {
  public static async addCardUserAssociation(cardId: string, userId: string): Promise<void> {
    try {
      await CardUserDataSchema.create({ cardId, userId });
    }
    catch(err) {
      throw new Error("Error creating card-user association");
    }
  }
}

export default CardUserDataRepository;
