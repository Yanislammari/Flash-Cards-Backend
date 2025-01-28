import { isCardForToday, isQuizzTodayDone } from "../../application/services/quizz.service";
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

        { category : Category.SECOND, date : '2021-01-02', expected : false},
        { category : Category.SECOND, date : '2021-01-03', expected : true},

        { category : Category.THIRD, date : '2021-01-04', expected : false},
        { category : Category.THIRD, date : '2021-01-05', expected : true},

        { category : Category.FOURTH, date : '2021-01-08', expected : false},
        { category : Category.FOURTH, date : '2021-01-09', expected : true},

        { category : Category.FIFTH, date : '2021-01-16', expected : false},
        { category : Category.FIFTH, date : '2021-01-17', expected : true},

        { category : Category.SIXTH, date : '2021-02-01', expected : false},
        { category : Category.SIXTH, date : '2021-02-02', expected : true},

        { category : Category.SEVENTH, date : '2021-03-01', expected : false},
        { category : Category.SEVENTH, date : '2021-03-06', expected : true},

        { category : Category.DONE, date : '2021-01-01', expected : false},
        { category : Category.DONE, date : '2021-01-02', expected : false},
    ];

    test.each(testCases)(
        'should return $expected when card is $category and date is $date',
        ({category, date, expected}) => {
            newCard.category = category;
            expect(isCardForToday(newCard, new Date(date))).toBe(expected);
        }
    );
});

describe('has a quizz be done today',()=>{

    it('a quizz has been done today',()=>{
        const cards: CardSchema[] = [];
        const dateArray = ['2021-01-01', '2021-01-03', '2021-01-02'];

        dateArray.forEach((date) => {
            const card = new CardSchema;
            card.dataValues.updated_at = date;
            cards.push(card);
        });
        
        expect(isQuizzTodayDone(cards, new Date('2021-01-03'))).toBe(true);
    });

    it('no quizz has been done today',()=>{
        const cards: CardSchema[] = [];
        const dateArray = ['2021-01-01', '2021-01-03', '2021-01-02', '2021-01-02'];

        dateArray.forEach((date) => {
            const card = new CardSchema;
            card.dataValues.updated_at = date;
            cards.push(card);
        });
        
        expect(isQuizzTodayDone(cards, new Date('2021-01-04'))).toBe(false);
    });

})