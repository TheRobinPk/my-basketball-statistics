import store from '../../store/store';
import {
    setDashboardChartData,
    setDashboardIsLoading,
    setDashboardSelectedFilterSpots,
    setDashboardSelectedRange
} from './dashboard-reducer';
import moment from 'moment/moment';
import {ShootAroundSpot} from '../../../domain/shoot-around';
import {ShootAroundChartData} from '../../../service/shoot-around-chart-service';

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

    it('should handle setDashboardSelectedRange correctly', () => {
        // GIVEN
        const date = moment();

        // WHEN
        store.dispatch(setDashboardSelectedRange({
            start: date.clone(),
            end: date.clone()
        }));

        // THEN
        const state = store.getState().dashboard;
        expect(state.selectedRange).toEqual({
            start: date.clone(),
            end: date.clone()
        });
    });

    it('should handle setDashboardSelectedFilterSpots correctly', () => {
        // GIVEN

        // WHEN
        store.dispatch(setDashboardSelectedFilterSpots([
            ShootAroundSpot.MID_RANGE_RIGHT_WING,
            ShootAroundSpot.PAINT
        ]));

        // THEN
        const state = store.getState().dashboard;
        expect(state.selectedFilterSpots).toEqual([
            ShootAroundSpot.MID_RANGE_RIGHT_WING,
            ShootAroundSpot.PAINT
        ]);
    });

    it('should handle setDashboardChartData correctly', () => {
        // GIVEN
        const chartData: ShootAroundChartData = {
            labels: ['label'],
            dataSets: [
                {
                    color: 'color',
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