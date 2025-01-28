import { isCardForToday } from "../../application/services/quizz.service";
import CardSchema from "../../infrastructure/schemas/card.schema";
import Category from "../../shared/value-objects/category";

describe('test is card for today',()=>{

    let newCard : CardSchema;

    beforeEach(() => {
        newCard = new CardSchema;
        newCard.category = Category.FIRST;
        newCard.dataValues.updated_at = '2021-01-01';
    });

    const testCases = [
        { category : Category.FIRST, date : '2021-01-02', expected : true},
        { category : Category.FIRST, date : '2021-01-03', expected : false},
        { category : Category.FIRST, date : '2021-01-01', expected : false},
    ];

    test.each(testCases)(
        'should return $expected when card is $category and date is $date',
        ({category, date, expected}) => {
            newCard.category = category;
            expect(isCardForToday(newCard, new Date(date))).toBe(expected);
        }
    );
});