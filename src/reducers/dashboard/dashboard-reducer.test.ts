import moment from 'moment/moment';
import {dashboardReducer, initialState, ShootAroundChartData} from './dashboard-reducer';
import {ShootAroundSpot} from '../../domain/shoot-around';

describe('dashboard-reducer', () => {
    it('should handle init correctly', () => {
        // GIVEN
        const date = moment();

        // WHEN
        const newState = dashboardReducer(initialState, {
            type: 'init',
            payload: {
                dateRange: {
                    start: date.clone().startOf('week'),
                    end: date.clone().endOf('week')
                },
                dataAggregationType: 'week'
            }
        });

        // THEN
        expect(newState.isInitialized).toEqual(true);
        expect(newState.dateRange).toEqual({
            start: date.clone().startOf('week'),
            end: date.clone().endOf('week')
        });
        expect(newState.dataAggregationType).toEqual('week');
    });

    it('should handle setDateRange correctly', () => {
        // GIVEN
        const date = moment();

        // WHEN
        const newState = dashboardReducer(initialState, {
            type: 'setDateRange',
            payload: {
                start: date.clone().startOf('week'),
                end: date.clone().endOf('week')
            }
        });

        // THEN
        expect(newState.dateRange).toEqual({
            start: date.clone().startOf('week'),
            end: date.clone().endOf('week')
        });
    });

    it('should handle setDataAggregationType correctly', () => {
        // GIVEN

        // WHEN
        const newState = dashboardReducer(initialState, {
            type: 'setDataAggregationType',
            payload: 'week'
        });

        // THEN
        expect(newState.dataAggregationType).toEqual('week');
    });

    it('should handle setShootAroundSpots correctly', () => {
        // GIVEN

        // WHEN
        const newState = dashboardReducer(initialState, {
            type: 'setShootAroundSpots',
            payload: [
                ShootAroundSpot.FREE_THROW,
                ShootAroundSpot.PAINT
            ]
        });

        // THEN
        expect(newState.shootAroundSpots).toEqual([
            ShootAroundSpot.FREE_THROW,
            ShootAroundSpot.PAINT
        ]);
    });

    it('should handle setChartData correctly', () => {
        // GIVEN
        const chartData: ShootAroundChartData = {
            labels: ['label'],
            dataSets: [
                {
                    spot: ShootAroundSpot.PAINT,
                    data: [1, 2]
                }
            ]
        };

        // WHEN
        const newState = dashboardReducer(initialState, {
            type: 'setChartData',
            payload: chartData
        });

        // THEN
        expect(newState.chartData).toEqual(chartData);
    });
});