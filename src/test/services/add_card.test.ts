import { sequelize } from "../../infrastructure/database";
import CardSchema from "../../infrastructure/schemas/card.schema";

describe('add card test', () => {

  let transaction : any;

  beforeAll(async () => {
    transaction = await sequelize.transaction();
  });

  afterAll(async () => {
    await transaction.rollback();
  });

  it('should send an error concerning question', async () => {

    const newCard = {
      "question": "",
      "answer": "aa",
      "tag": "tag"
    };

    expect(CardSchema.create(newCard, transaction)).rejects.toThrow(
      "Validation error: Question cannot be empty"
    );
  });

  it('should send an error concerning question', async () => {

    const newCard = {
      "question": "",
      "answer": "aa",
      "tag": "tag"
    };

    expect(CardSchema.create(newCard, transaction)).rejects.toThrow(
      "Validation error: Question cannot be empty"
    );
  });

});
