//test date difference

import { calculateDaysBetween } from "../../shared/utils/date";

describe('Nombre de jours de différence entre deux dates', () => {

    const testCases = [
        {startDate : new Date('2021-01-01'), endDate : new Date('2021-01-01'), expected : 0},
        {startDate : new Date('2021-01-01'), endDate : new Date('2021-01-02'), expected : 1},
        {startDate : new Date('2021-01-01'), endDate : new Date('2021-01-03'), expected : 2},
        {startDate : new Date('2021-01-01'), endDate : new Date('2021-02-04'), expected : 34},
        {startDate : new Date('2021-01-01'), endDate : new Date('2022-01-01'), expected : 365},
        {startDate : new Date('2021-01-01'), endDate : new Date('2022-01-02'), expected : 366},
        {startDate : new Date('2021-01-01'), endDate : new Date('2022-02-03'), expected : 398},
        {startDate : new Date('2021-01-03'), endDate : new Date('2021-01-01'), expected : -2},
    ];


    test.each(testCases)(
        'Entre %s et %s, il y a %i jours de différence', 
        ({startDate, endDate, expected}) => {
        expect(calculateDaysBetween(startDate, endDate)).toBe(expected);
    });

});