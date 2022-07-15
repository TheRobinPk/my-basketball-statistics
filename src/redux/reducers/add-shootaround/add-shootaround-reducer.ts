import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShootAroundSpot} from '../../../domain/shoot-around';

interface FormError {
    isPresent: boolean;
    text: string;
}

export interface AddShootAroundState {
    totalAttempts: string;
    madeAttempts: string;
    shootAroundSpot?: ShootAroundSpot;
    submitDisabled: boolean;
    isLoading: boolean;
    submitSuccess: boolean;
    error: FormError;
}

export const initialState: AddShootAroundState = {
    totalAttempts: '',
    madeAttempts: '',
    shootAroundSpot: undefined,
    submitDisabled: true,
    isLoading: false,
    submitSuccess: false,
    error: {
        isPresent: false,
        text: ''
    }
};

type ShootAroundValidationResult = Omit<AddShootAroundState, 'totalAttempts' | 'madeAttempts' | 'isLoading' | 'submitSuccess'>
type ShootAroundForm = Pick<AddShootAroundState, 'totalAttempts' | 'madeAttempts' | 'shootAroundSpot'>;

const validateShootAround = (totalAttempts: string, madeAttempts: string, shootAroundSpot: ShootAroundSpot | undefined): ShootAroundValidationResult => {
        if (totalAttempts.length === 0 || madeAttempts.length === 0 || shootAroundSpot === undefined) {
            return {
                error: {
                    isPresent: false,
                    text: ''
                },
                submitDisabled: true,
            };
        } else {
            const parsedTotalAttempts = parseInt(totalAttempts);
            const parsedMadeAttempts = parseInt(madeAttempts);

            if (parsedTotalAttempts < 0 || parsedMadeAttempts < 0) {
                return {
                    error: {
                        isPresent: true,
                        text: 'Please provide values larger than 0'
                    },
                    submitDisabled: true,
                };
            } else if (parsedTotalAttempts < 1) {
                return {
                    error: {
                        isPresent: true,
                        text: 'Total Attempts have to be greater than 0'
                    },
                    submitDisabled: true,
                };
            } else if (parsedMadeAttempts > parsedTotalAttempts) {
                return {
                    error: {
                        isPresent: true,
                        text: 'Made Attempts cannot be larger than Total Attempts'
                    },
                    submitDisabled: true,
                };
            } else {
                return {
                    error: {
                        isPresent: false,
                        text: ''
                    },
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
            state.error = validationResult.error;
            state.submitDisabled = validationResult.submitDisabled;
        },
        resetShootAroundForm: (state) => {
            state.isLoading = false;
            state.submitDisabled = true;
            state.submitSuccess = false;
            state.totalAttempts = '';
            state.madeAttempts = '';
            state.shootAroundSpot = undefined;
            state.error = {
                isPresent: false,
                text: ''
            };
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
