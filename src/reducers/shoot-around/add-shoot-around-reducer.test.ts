import {addShootAroundReducer, AddShootAroundState, initialState,} from './add-shoot-around-reducer';
import {ShootAroundSpot} from '../../domain/shoot-around';

describe('add-shoot-around-reducer', () => {
    it('should handle setLoading correctly', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, { type: 'setLoading', payload: true });

        // THEN
        expect(newState.isLoading).toEqual(true);
    });

    it('should handle setSubmitSuccess correctly', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, { type: 'setSubmitSuccess', payload: true });

        // THEN
        expect(newState.submitSuccess).toEqual(true);
    });

    it('should set disabled to true when setFormValues is dispatched with empty madeAttempts', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '10',
                madeAttempts: '',
                shootAroundSpot: ShootAroundSpot.PAINT
            }
        });

        // THEN
        expect(newState.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setFormValues is dispatched with empty totalAttempts', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '',
                madeAttempts: '4',
                shootAroundSpot: ShootAroundSpot.PAINT
            }
        });

        // THEN
        expect(newState.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setFormValues is dispatched with empty shootAroundSpot', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '10',
                madeAttempts: '4',
                shootAroundSpot: undefined
            }
        });

        // THEN
        expect(newState.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setFormValues is dispatched with negative totalAttempts', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '-2',
                madeAttempts: '4',
                shootAroundSpot: ShootAroundSpot.PAINT
            }
        });

        // THEN
        expect(newState.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setFormValues is dispatched with negative madeAttempts', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '2',
                madeAttempts: '-2',
                shootAroundSpot: ShootAroundSpot.PAINT
            }
        });

        // THEN
        expect(newState.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setFormValues is dispatched with non positive totalAttempts', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '0',
                madeAttempts: '3',
                shootAroundSpot: ShootAroundSpot.PAINT
            }
        });

        // THEN
        expect(newState.submitDisabled).toEqual(true);
    });

    it('should set disabled to true when setFormValues is dispatched with madeAttempts greater than totalAttempts', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '2',
                madeAttempts: '5',
                shootAroundSpot: ShootAroundSpot.PAINT
            }
        });

        // THEN
        expect(newState.submitDisabled).toEqual(true);
    });

    it('should set the form values when setFormValues is dispatched', () => {
        // GIVEN

        // WHEN
        const newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '10',
                madeAttempts: '5',
                shootAroundSpot: ShootAroundSpot.PAINT
            }
        });

        // THEN
        expect(newState.shootAroundSpot).toEqual(ShootAroundSpot.PAINT);
        expect(newState.totalAttempts).toEqual('10');
        expect(newState.madeAttempts).toEqual('5');
        expect(newState.submitDisabled).toEqual(false);
    });

    it('should reset the from when resetShootAroundForm is dispatched', () => {
        // GIVEN
        let newState = addShootAroundReducer(initialState, {
            type: 'setFormValues',
            payload: {
                totalAttempts: '10',
                madeAttempts: '5',
                shootAroundSpot: ShootAroundSpot.PAINT
            }
        });
        newState = addShootAroundReducer(newState, { type: 'setSubmitSuccess', payload: true });
        newState = addShootAroundReducer(newState, { type: 'setSubmitSuccess', payload: true });

        // WHEN
        newState = addShootAroundReducer(newState, {
            type: 'reset'
        });

        // THEN
        const expectedState: AddShootAroundState = {
            totalAttempts: '',
            madeAttempts: '',
            shootAroundSpot: undefined,
            submitDisabled: true,
            isLoading: false,
            submitSuccess: false
        };
        expect(newState).toEqual(expectedState);
    });
});