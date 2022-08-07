import store from '../../store/store';
import {
    AddShootAroundState,
    resetShootAroundForm,
    setAddShootAroundIsLoading,
    setAddShootAroundSubmitSuccess,
    setShootAroundFormValues,
} from './add-shoot-around-reducer';
import {ShootAroundSpot} from '../../../domain/shoot-around';

describe('add-shoot-around-reducer', () => {
    it('should set up the initialState correctly', () => {
        // GIVEN

        // WHEN
        const state = store.getState().addShootAround;

        // THEN
        const expectedState:AddShootAroundState = {
            totalAttempts: '',
            madeAttempts: '',
            shootAroundSpot: undefined,
            submitDisabled: true,
            isLoading: false,
            submitSuccess: false
        };
        expect(state).toEqual(expectedState);
    });

    it('should handle setAddShootAroundIsLoading correctly', () => {
        // GIVEN

        // WHEN
        store.dispatch(setAddShootAroundIsLoading(true));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.isLoading).toEqual(true);
    });

    it('should handle setAddShootAroundSubmitSuccess correctly', () => {
        // GIVEN

        // WHEN
        store.dispatch(setAddShootAroundSubmitSuccess(true));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.submitSuccess).toEqual(true);
    });

    it('should set disabled to true when setShootAroundFormValues is dispatched with empty madeAttempts', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '10',
            madeAttempts: '',
            shootAroundSpot: ShootAroundSpot.PAINT
        }));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setShootAroundFormValues is dispatched with empty totalAttempts', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '',
            madeAttempts: '4',
            shootAroundSpot: ShootAroundSpot.PAINT
        }));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setShootAroundFormValues is dispatched with empty shootAroundSpot', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '10',
            madeAttempts: '4',
            shootAroundSpot: undefined
        }));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setShootAroundFormValues is dispatched with negative totalAttempts', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '-2',
            madeAttempts: '4',
            shootAroundSpot: ShootAroundSpot.PAINT
        }));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setShootAroundFormValues is dispatched with negative madeAttempts', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '2',
            madeAttempts: '-2',
            shootAroundSpot: ShootAroundSpot.PAINT
        }));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setShootAroundFormValues is dispatched with non positive totalAttempts', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '0',
            madeAttempts: '3',
            shootAroundSpot: ShootAroundSpot.PAINT
        }));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setShootAroundFormValues is dispatched with madeAttempts greater than totalAttempts', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '2',
            madeAttempts: '5',
            shootAroundSpot: ShootAroundSpot.PAINT
        }));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.submitDisabled).toEqual(true);
    });

    it('should set the form values when setShootAroundFormValues is dispatched', () => {
        // GIVEN

        // WHEN
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '10',
            madeAttempts: '5',
            shootAroundSpot: ShootAroundSpot.PAINT
        }));

        // THEN
        const state = store.getState().addShootAround;
        expect(state.shootAroundSpot).toEqual(ShootAroundSpot.PAINT);
        expect(state.totalAttempts).toEqual('10');
        expect(state.madeAttempts).toEqual('5');
        expect(state.submitDisabled).toEqual(false);
    });

    it('should reset the from when resetShootAroundForm is dispatched', () => {
        // GIVEN
        store.dispatch(setAddShootAroundIsLoading(true));
        store.dispatch(setShootAroundFormValues({
            totalAttempts: '10',
            madeAttempts: '3',
            shootAroundSpot: ShootAroundSpot.PAINT
        }));
        store.dispatch(setAddShootAroundSubmitSuccess(true));

        // WHEN
        store.dispatch(resetShootAroundForm());

        // THEN
        const state = store.getState().addShootAround;
        const expectedState:AddShootAroundState = {
            totalAttempts: '',
            madeAttempts: '',
            shootAroundSpot: undefined,
            submitDisabled: true,
            isLoading: false,
            submitSuccess: false
        };
        expect(state).toEqual(expectedState);
    });
});