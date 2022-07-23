import store from '../../store/store';
import {setDashboardIsLoading, setDashboardSelectedRange, setDashboardShootArounds} from './dashboard-reducer';
import moment from 'moment/moment';
import {ShootAround, ShootAroundSpot} from '../../../domain/shoot-around';

describe('dashboard-reducer', () => {
    it('should set up the initialState correctly', () => {
        // GIVEN

        // WHEN
        const state = store.getState().dashboard;

        // THEN
        expect(state.isLoading).toEqual(true);
        expect(state.shootArounds).toEqual([]);
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

    it('should handle setDashboardShootArounds correctly', () => {
        // GIVEN
        const shootAround: ShootAround = {
            totalAttempts: 10,
            madeAttempts: 5,
            spot: ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
            dateTime: moment()
        };

        // WHEN
        store.dispatch(setDashboardShootArounds([shootAround]));

        // THEN
        const state = store.getState().dashboard;
        expect(state.shootArounds).toEqual([shootAround]);
    });
});