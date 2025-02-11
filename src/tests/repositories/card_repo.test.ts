import CardRepository from "../../infrastructure/repositories/card.repository";
import CardSchema from "../../infrastructure/schemas/card.schema";
import Category from "../../domain/value-objects/category";

describe('add card test', () => {

  let newCard: Partial<CardSchema>;

  beforeEach(() => {
    newCard = new CardSchema;
    newCard.category = Category.FIRST;
    newCard.question = "What is me?";
    newCard.answer = "Alexis";
    newCard.tag = "tag";
  });

  const testCases = [ // All cases where add should fail
    { field: "question", value: "", errorMessage: "Error adding card" },
    { field: "question", value: undefined, errorMessage: "Error adding card" },
    { field: "question", value: null, errorMessage: "Error adding card" },
    { field: "question", value: "a".repeat(256), errorMessage: "Error adding card" },  // Exceeds 255 characters

    { field: "answer", value: "", errorMessage: "Error adding card" },
    { field: "answer", value: undefined, errorMessage: "Error adding card" },
    { field: "answer", value: null, errorMessage: "Error adding card" },
    { field: "answer", value: "a".repeat(256), errorMessage: "Error adding card" },

    { field: "tag", value: "", errorMessage: "Error adding card" },
    { field: "tag", value: undefined, errorMessage: "Error adding card" },
    { field: "tag", value: null, errorMessage: "Error adding card" },
    { field: "tag", value: "a".repeat(256), errorMessage: "Error adding card" },

    { field: "category", value: undefined, errorMessage: "Error adding card" },
    { field: "category", value: null, errorMessage: "Error adding card" },
    { field: "category", value: "wrong category", errorMessage: "Error adding card" }, // no need for length check in cate
  ];

  test.each(testCases)(
    "should send an error when trying to add a card when $field has $value",
    async ({ field, value, errorMessage }) => {

      (newCard as any)[field] = value;

      try {
        await CardRepository.addCard(newCard);
      } catch (err: any) {
        expect(err).toEqual(new Error(errorMessage));
        return;
      }

      expect(true).toBe(false); // Fails test if no error is thrown
    }
  );


  /*it('should add a card', async () => {


    const transaction = await sequelize.transaction();
    const cardToAdd = {
      category: Category.FIRST,
      question: "What is me?",
      answer: "Alexis",
      tag: "tag",
    }

    try {
    
      const card = await CardSchema.create(cardToAdd, { transaction });
      await transaction.rollback();
      

      expect(card).not.toBeNull();
      expect(card.category).toBe(Category.FIRST);
      expect(card.question).toBe("What is me?");
      expect(card.answer).toBe("Alexis");
      expect(card.tag).toBe("tag");
      expect(card.createdAt).not.toBeNull();
      expect(card.updatedAt).not.toBeNull();

    } catch (error) {
      
      await transaction.rollback();
      throw error;
    }
  });*/
});
