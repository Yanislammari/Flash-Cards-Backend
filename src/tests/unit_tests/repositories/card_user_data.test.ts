import CardUserDataRepository from "../../../infrastructure/repositories/card-user-data.repository";
import CardUserDataSchema from "../../../infrastructure/schemas/card-user-data.schema";

describe('card user data repository', () => {

  let newCardUser : CardUserDataSchema;

  beforeEach(() => {
    newCardUser = new CardUserDataSchema;
    newCardUser.cardId = 'a random card id';
    newCardUser.userId = 'a random user id';
  });

  const testValues = [
    { field : 'cardId', value : '' },
    { field : 'cardId', value : null },
    { field : 'cardId', value : undefined },
    { field : 'userId', value : '' },
    { field : 'userId', value : null },
    { field : 'userId', value : undefined },
    { field : 'userId', value : 'not a valid user id' }, // not a valid user id
    { field : 'cardId', value : 'not a valid card id' }, // not a valid card id
  ]
  
  test.each(testValues)(
    "should send an error when trying to add a user when $field has $value",
    async ({ field, value }) => {

      (newCardUser as any)[field] = value;

      try {
        await CardUserDataRepository.addCardUserAssociation(newCardUser.cardId, newCardUser.userId);
      } catch (err: any) {
        expect(err).toEqual(new Error("Error creating card-user association"));
        return;
      }

      expect(true).toBe(false);
    }
  );
});