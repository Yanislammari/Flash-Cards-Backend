// test of category increment

import Category, { incrementCategory } from "../../shared/value-objects/category";

describe('Increment category', () => {

    const testCases = [
        {category : Category.FIRST, expected : Category.SECOND},
        {category : Category.SECOND, expected : Category.THIRD},
        {category : Category.THIRD, expected : Category.FOURTH},
        {category : Category.FOURTH, expected : Category.FIFTH},
        {category : Category.FIFTH, expected : Category.SIXTH},
        {category : Category.SIXTH, expected : Category.SEVENTH},
        {category : Category.SEVENTH, expected : Category.DONE},
        {category : Category.DONE, expected : Category.DONE},
    ];

    test.each(testCases)(
        'After %s, the next category is %s', 
        ({category, expected}) => {
        expect(incrementCategory(category)).toBe(expected);
    });
})