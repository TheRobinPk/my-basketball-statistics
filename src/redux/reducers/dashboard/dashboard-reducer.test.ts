import store from '../../store/store';
import {setDashboardChartData, setDashboardDataAggregationType, setDashboardDateRange, setDashboardIsLoading, setDashboardShootAroundSpots, ShootAroundChartData} from './dashboard-reducer';
import moment from 'moment/moment';
import {ShootAroundSpot} from '../../../domain/shoot-around';

describe('dashboard-reducer', () => {
    it('should set up the initialState correctly', () => {
        // GIVEN

        // WHEN
        const state = store.getState().dashboard;

        // THEN
        expect(state.isLoading).toEqual(true);
        expect(state.chartData).toEqual(undefined);
    });

    it('should handle setDashboardIsLoading correctly', () => {
        // GIVEN

        // WHEN
        store.dispatch(setDashboardIsLoading(true));

        // THEN
        const state = store.getState().dashboard;
        expect(state.isLoading).toEqual(true);
    });

    it('should handle setDashboardDateRange correctly', () => {
        // GIVEN
        const date = moment();

        // WHEN
        store.dispatch(setDashboardDateRange({
            start: date.clone().startOf('week'),
            end: date.clone().endOf('week')
        }));

        // THEN
        const state = store.getState().dashboard;
        expect(state.dateRange).toEqual({
            start: date.clone().startOf('week'),
            end: date.clone().endOf('week')
        });
    });

    it('should handle setDashboardDataAggregationType correctly', () => {
        // GIVEN

        // WHEN
        store.dispatch(setDashboardDataAggregationType('week'));

        // THEN
        const state = store.getState().dashboard;
        expect(state.dataAggregationType).toEqual('week');
    });

    it('should handle setDashboardShootAroundSpots correctly', () => {
        // GIVEN

        // WHEN
        store.dispatch(setDashboardShootAroundSpots([
            ShootAroundSpot.FREE_THROW,
            ShootAroundSpot.PAINT
        ]));

        // THEN
        const state = store.getState().dashboard;
        expect(state.shootAroundSpots).toEqual([
            ShootAroundSpot.FREE_THROW,
            ShootAroundSpot.PAINT
        ]);
    });

    it('should handle setDashboardChartData correctly', () => {
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
        store.dispatch(setDashboardChartData(chartData));

        // THEN
        const state = store.getState().dashboard;
        expect(state.chartData).toEqual(chartData);
    });
});