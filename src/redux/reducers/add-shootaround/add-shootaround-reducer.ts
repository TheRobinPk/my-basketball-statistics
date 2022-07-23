import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShootAroundSpot} from '../../../domain/shoot-around';

export interface AddShootAroundState {
    totalAttempts: string;
    madeAttempts: string;
    shootAroundSpot?: ShootAroundSpot;
    submitDisabled: boolean;
    isLoading: boolean;
    submitSuccess: boolean;
}

export const initialState: AddShootAroundState = {
    totalAttempts: '',
    madeAttempts: '',
    shootAroundSpot: undefined,
    submitDisabled: true,
    isLoading: false,
    submitSuccess: false
};

type ShootAroundValidationResult = Omit<AddShootAroundState, 'totalAttempts' | 'madeAttempts' | 'isLoading' | 'submitSuccess'>
type ShootAroundForm = Pick<AddShootAroundState, 'totalAttempts' | 'madeAttempts' | 'shootAroundSpot'>;

const validateShootAround = (totalAttempts: string, madeAttempts: string, shootAroundSpot: ShootAroundSpot | undefined): ShootAroundValidationResult => {
        if (totalAttempts.length === 0 || madeAttempts.length === 0 || shootAroundSpot === undefined) {
            return {
                submitDisabled: true,
            };
        } else {
            const parsedTotalAttempts = parseInt(totalAttempts);
            const parsedMadeAttempts = parseInt(madeAttempts);

            if (parsedTotalAttempts < 0 || parsedMadeAttempts < 0) {
                return {
                    submitDisabled: true,
                };
            } else if (parsedTotalAttempts < 1) {
                return {
                    submitDisabled: true,
                };
            } else if (parsedMadeAttempts > parsedTotalAttempts) {
                return {
                    submitDisabled: true,
                };
            } else {
                return {
                    submitDisabled: false,
                };
            }
        }
};

const addShootAroundSlice = createSlice({
    name: 'add-shoot-around',
    initialState,
    reducers: {
        setAddShootAroundIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setAddShootAroundSubmitSuccess: (state, action: PayloadAction<boolean>) => {
            state.submitSuccess = action.payload;
        },
        setShootAroundFormValues: (state, action: PayloadAction<ShootAroundForm>) => {
            const { totalAttempts, madeAttempts, shootAroundSpot } = action.payload;
            state.totalAttempts = totalAttempts;
            state.madeAttempts = madeAttempts;
            state.shootAroundSpot = shootAroundSpot;

            const validationResult = validateShootAround(totalAttempts, madeAttempts, shootAroundSpot);
            state.submitDisabled = validationResult.submitDisabled;
        },
        resetShootAroundForm: (state) => {
            state.isLoading = false;
            state.submitDisabled = true;
            state.submitSuccess = false;
            state.totalAttempts = '';
            state.madeAttempts = '';
            state.shootAroundSpot = undefined;
        }
    }
});

const addShootAroundReducer = addShootAroundSlice.reducer;

export const {
    setAddShootAroundIsLoading,
    setShootAroundFormValues,
    resetShootAroundForm,
    setAddShootAroundSubmitSuccess
} = addShootAroundSlice.actions;
export const submitShootAround = createAction('add-shoot-around/submitShootAround');
export default addShootAroundReducer;
