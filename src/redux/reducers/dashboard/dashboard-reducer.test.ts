import store from '../../store/store';
import {setDashboardAggregatedValues, setDashboardIsLoading, setDashboardSelectedFilterSpots, setDashboardSelectedRange, ShootAroundAggregatedResult} from './dashboard-reducer';
import moment from 'moment/moment';
import {ShootAroundSpot} from '../../../domain/shoot-around';

describe('dashboard-reducer', () => {
    it('should set up the initialState correctly', () => {
        // GIVEN

        // WHEN
        const state = store.getState().dashboard;

        // THEN
        expect(state.isLoading).toEqual(true);
        expect(state.aggregatedValues).toEqual([]);
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

    it('should handle setDashboardAggregatedValues correctly', () => {
        // GIVEN
        const shootAround: ShootAroundAggregatedResult = {
            totalAttempts: 10,
            madeAttempts: 5,
            spot: ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
            day: moment()
        };

        // WHEN
        store.dispatch(setDashboardAggregatedValues([shootAround]));

        // THEN
        const state = store.getState().dashboard;
        expect(state.aggregatedValues).toEqual([shootAround]);
    });
});