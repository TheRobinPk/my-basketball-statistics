import ShootAroundChartService from './shoot-around-chart-service';
import {DateRange} from '../../ui-components/date-picker/date-range-picker';
import moment from 'moment';
import {ShootAround, ShootAroundSpot} from '../../domain/shoot-around';

let shootAroundChartService: ShootAroundChartService;

describe('shoot-around-chart-service', () => {
    beforeEach(() => {
        shootAroundChartService = new ShootAroundChartService();
    });

    it('should calculate the chart data by day', () => {
        // GIVEN
        const start = moment('2022-06-28');
        const end = moment('2022-07-05');
        const shootArounds: ShootAround[] = [
            {
                dateTime: moment('2022-06-28'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 1,
                madeAttempts: 1,
            },
            {
                dateTime: moment('2022-06-29'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 3,
                madeAttempts: 2,
            },
            {
                dateTime: moment('2022-06-30'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 5,
                madeAttempts: 3,
            },
            {
                dateTime: moment('2022-07-01'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 7,
                madeAttempts: 4,
            },
            {
                dateTime: moment('2022-07-02'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 9,
                madeAttempts: 5,
            },
            {
                dateTime: moment('2022-07-04'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 11,
                madeAttempts: 6,
            },

            {
                dateTime: moment('2022-07-05'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 13,
                madeAttempts: 7,
            },
            {
                dateTime: moment('2022-07-04'),
                spot: ShootAroundSpot.FREE_THROW,
                totalAttempts: 20,
                madeAttempts: 20,
            },
            {
                dateTime: moment('2022-07-05'),
                spot: ShootAroundSpot.FREE_THROW,
                totalAttempts: 20,
                madeAttempts: 20,
            },
            {
                dateTime: moment('2022-07-05 12:41'),
                spot: ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY,
                totalAttempts: 10,
                madeAttempts: 6,
            },
            {
                dateTime: moment('2022-07-05 12:42'),
                spot: ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY,
                totalAttempts: 10,
                madeAttempts: 2,
            }
        ];
        const dateRange: DateRange = {
            start: start,
            end: end
        };

        // WHEN
        const result = shootAroundChartService.calculateShootAroundChartData(shootArounds, 'day', dateRange);

        // THEN
        expect(result.labels).toEqual(['2022-06-28', '2022-06-29', '2022-06-30', '2022-07-01', '2022-07-02', '2022-07-03', '2022-07-04', '2022-07-05']);
        expect(result.dataSets.length).toEqual(3);

        expect(result.dataSets[0].spot).toEqual(ShootAroundSpot.PAINT);
        expect(result.dataSets[0].data).toEqual([
            1/1,
            2/3,
            3/5,
            4/7,
            5/9,
            0,
            6/11,
            7/13
        ]);

        expect(result.dataSets[1].spot).toEqual(ShootAroundSpot.FREE_THROW);
        expect(result.dataSets[1].data).toEqual([
            0,
            0,
            0,
            0,
            0,
            0,
            20/20,
            20/20
        ]);

        expect(result.dataSets[2].spot).toEqual(ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY);
        expect(result.dataSets[2].data).toEqual([
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            8/20
        ]);

    });

    it('should calculate the chart data by week', () => {
        // GIVEN
        const start = moment('2022-06-28');
        const end = moment('2022-08-05');
        const shootArounds: ShootAround[] = [
            {
                dateTime: moment('2022-06-29'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 1,
                madeAttempts: 1,
            },
            {
                dateTime: moment('2022-06-30'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 3,
                madeAttempts: 2,
            },
            {
                dateTime: moment('2022-07-03'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 5,
                madeAttempts: 3,
            },
            {
                dateTime: moment('2022-07-07'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 7,
                madeAttempts: 4,
            },
            {
                dateTime: moment('2022-07-11'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 9,
                madeAttempts: 5,
            },
            {
                dateTime: moment('2022-07-11'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 11,
                madeAttempts: 6,
            },

            {
                dateTime: moment('2022-07-20'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 13,
                madeAttempts: 7,
            },
            {
                dateTime: moment('2022-07-21'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 15,
                madeAttempts: 8,
            },
            {
                dateTime: moment('2022-08-03'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 17,
                madeAttempts: 9,
            },
            {
                dateTime: moment('2022-08-04'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 19,
                madeAttempts: 10,
            },
            {
                dateTime: moment('2022-08-04'),
                spot: ShootAroundSpot.FREE_THROW,
                totalAttempts: 20,
                madeAttempts: 20,
            },
            {
                dateTime: moment('2022-08-04 12:41'),
                spot: ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY,
                totalAttempts: 10,
                madeAttempts: 6,
            },
            {
                dateTime: moment('2022-08-04 12:42'),
                spot: ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY,
                totalAttempts: 10,
                madeAttempts: 2,
            }
        ];
        const dateRange: DateRange = {
            start: start,
            end: end
        };

        // WHEN
        const result = shootAroundChartService.calculateShootAroundChartData(shootArounds, 'week', dateRange);

        // THEN
        expect(result.labels).toEqual(['2022 25th', '2022 26th', '2022 27th', '2022 28th', '2022 29th', '2022 30th']);
        expect(result.dataSets.length).toEqual(3);

        expect(result.dataSets[0].spot).toEqual(ShootAroundSpot.PAINT);
        expect(result.dataSets[0].data).toEqual([
            3/4,
            7/12,
            11/20,
            15/28,
            0,
            19/36
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

        expect(result.dataSets[2].spot).toEqual(ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY);
        expect(result.dataSets[2].data).toEqual([
            0,
            0,
            0,
            0,
            0,
            8/20
        ]);

    });

    it('should calculate the chart data by month', () => {
        // GIVEN
        const start = moment('2022-04-02');
        const end = moment('2022-07-30');
        const shootArounds: ShootAround[] = [
            {
                dateTime: moment('2022-04-10'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 1,
                madeAttempts: 1,
            },
            {
                dateTime: moment('2022-04-11'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 3,
                madeAttempts: 2,
            },
            {
                dateTime: moment('2022-04-18'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 5,
                madeAttempts: 3,
            },
            {
                dateTime: moment('2022-04-19'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 7,
                madeAttempts: 4,
            },
            {
                dateTime: moment('2022-04-26'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 9,
                madeAttempts: 5,
            },
            {
                dateTime: moment('2022-04-27'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 11,
                madeAttempts: 6,
            },

            {
                dateTime: moment('2022-06-20'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 13,
                madeAttempts: 7,
            },
            {
                dateTime: moment('2022-06-21'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 15,
                madeAttempts: 8,
            },
            {
                dateTime: moment('2022-07-03'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 17,
                madeAttempts: 9,
            },
            {
                dateTime: moment('2022-07-04'),
                spot: ShootAroundSpot.PAINT,
                totalAttempts: 19,
                madeAttempts: 10,
            },
            {
                dateTime: moment('2022-05-04'),
                spot: ShootAroundSpot.FREE_THROW,
                totalAttempts: 20,
                madeAttempts: 20,
            },
            {
                dateTime: moment('2022-07-04 12:41'),
                spot: ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY,
                totalAttempts: 10,
                madeAttempts: 6,
            },
            {
                dateTime: moment('2022-07-04 12:42'),
                spot: ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY,
                totalAttempts: 10,
                madeAttempts: 2,
            }
        ];
        const dateRange: DateRange = {
            start: start,
            end: end
        };

        // WHEN
        const result = shootAroundChartService.calculateShootAroundChartData(shootArounds, 'month', dateRange);

        // THEN
        expect(result.labels).toEqual(['2022 Apr', '2022 May', '2022 Jun', '2022 Jul']);
        expect(result.dataSets.length).toEqual(3);

        expect(result.dataSets[0].spot).toEqual(ShootAroundSpot.PAINT);
        expect(result.dataSets[0].data).toEqual([
            21/36,
            0,
            15/28,
            19/36
        ]);

        expect(result.dataSets[1].spot).toEqual(ShootAroundSpot.FREE_THROW);
        expect(result.dataSets[1].data).toEqual([
            0,
            20/20,
            0,
            0
        ]);

        expect(result.dataSets[2].spot).toEqual(ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY);
        expect(result.dataSets[2].data).toEqual([
            0,
            0,
            0,
            8/20
        ]);

    });
});