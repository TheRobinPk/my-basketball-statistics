import store from '../../store/store';
import {ShootAround, ShootAroundSpot} from '../../../domain/shoot-around';
import {resetShootAroundList, setShootAroundListData, setShootAroundListIsLoading} from './shootaround-list-reducer';
import moment from 'moment/moment';

describe('shootaround-list-reducer', () => {
    it('should set up the initialState correctly', () => {
        // GIVEN

        // WHEN
        const state = store.getState().shootAroundList;

        // THEN
        expect(state.isLoading).toEqual(true);
        expect(state.data).toEqual([]);
    });

    it('should handle setShootAroundListIsLoading correctly', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundListIsLoading(true));

        // THEN
        const state = store.getState().shootAroundList;
        expect(state.isLoading).toEqual(true);
    });

    it('should handle setShootAroundListData correctly', () => {
        // GIVEN
        const date = moment();
        const shootArounds: ShootAround[] = [
            {
                totalAttempts: 10,
                madeAttempts: 5,
                spot: ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
                dateTime: date
            },
            {
                totalAttempts: 10,
                madeAttempts: 10,
                spot: ShootAroundSpot.PAINT,
                dateTime: date
            }
        ];

        // WHEN
        store.dispatch(setShootAroundListData(shootArounds));

        // THEN
        const state = store.getState().shootAroundList;
        expect(state.data).toEqual(shootArounds);
    });

    it('should handle resetShootAroundList correctly', () => {
        // GIVEN
        const date = moment();
        const shootArounds: ShootAround[] = [
            {
                totalAttempts: 10,
                madeAttempts: 5,
                spot: ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
                dateTime: date
            },
            {
                totalAttempts: 10,
                madeAttempts: 10,
                spot: ShootAroundSpot.PAINT,
                dateTime: date
            }
        ];
        store.dispatch(setShootAroundListData(shootArounds));
        store.dispatch(setShootAroundListIsLoading(false));

        // WHEN
        store.dispatch(resetShootAroundList());

        // THEN
        const state = store.getState().shootAroundList;
        expect(state.data).toEqual([]);
        expect(state.isLoading).toEqual(true);
    });
});