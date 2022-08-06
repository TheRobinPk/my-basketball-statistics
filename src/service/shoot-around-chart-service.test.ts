import ShootAroundChartService from './shoot-around-chart-service';
import {ShootAroundAggregatedResult} from './shoot-around-service';
import {DateRange} from '../components/common/date-picker/date-range-picker';
import moment from 'moment';
import {ShootAroundSpot} from '../domain/shoot-around';

let shootAroundChartService: ShootAroundChartService;

describe('shoot-around-chart-service', () => {
    beforeEach(() => {
        shootAroundChartService = new ShootAroundChartService();
    });

    it('should work', () => {
        // GIVEN
        const start = moment('2022-06-26');
        const end = moment('2022-08-06');
        const aggregatedResults: ShootAroundAggregatedResult[] = [
            {
                day: moment('2022-06-27'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 1,
                madeAttempts: 1,
            },
            {
                day: moment('2022-06-30'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 3,
                madeAttempts: 2,
            },
            {
                day: moment('2022-07-03'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 5,
                madeAttempts: 3,
            },
            {
                day: moment('2022-07-07'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 7,
                madeAttempts: 4,
            },
            {
                day: moment('2022-07-11'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 9,
                madeAttempts: 4,
            },
            {
                day: moment('2022-07-11'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 11,
                madeAttempts: 5,
            },

            {
                day: moment('2022-07-20'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 13,
                madeAttempts: 6,
            },
            {
                day: moment('2022-07-21'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 15,
                madeAttempts: 7,
            },
            {
                day: moment('2022-08-03'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 17,
                madeAttempts: 8,
            },
            {
                day: moment('2022-08-04'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 19,
                madeAttempts: 9,
            },
            {
                day: moment('2022-08-04'),
                spot: ShootAroundSpot.FREE_THROW,
                totalAttempts: 20,
                madeAttempts: 20,
            },
        ];
        const dateRange: DateRange = {
            start: start,
            end: end
        };

        // WHEN
        const result = shootAroundChartService.calculateShootAroundChartData(aggregatedResults, 'week', dateRange);

        // THEN
        expect(result.labels).toEqual(['06-26', '07-03', '07-10', '07-17', '07-24', '07-31']);
        expect(result.dataSets.length).toEqual(2);

        expect(result.dataSets[0].spot).toEqual(ShootAroundSpot.PAINT);
        expect(result.dataSets[0].data).toEqual([
            3/4,
            7/12,
            9/20,
            13/28,
            0,
            17/36
        ]);

        expect(result.dataSets[1].spot).toEqual(ShootAroundSpot.FREE_THROW);
        expect(result.dataSets[1].data).toEqual([
            0,
            0,
            0,
            0,
            0,
            20/20
        ]);

    });
});