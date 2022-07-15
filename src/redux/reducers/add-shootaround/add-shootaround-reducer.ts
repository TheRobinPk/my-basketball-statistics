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

const validateShootAround = (totalAttempts: string, madeAttempts: string): ShootAroundValidationResult => {
        if (totalAttempts.length === 0 || madeAttempts.length === 0) {
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
        setTotalAttempts: (state, action: PayloadAction<string>) => {
            state.totalAttempts = action.payload;
            const validationResult = validateShootAround(action.payload, state.madeAttempts);
            state.error = validationResult.error;
            state.submitDisabled = validationResult.submitDisabled;
        },
        setMadeAttempts: (state, action: PayloadAction<string>) => {
            state.madeAttempts = action.payload;
            const validationResult = validateShootAround(state.totalAttempts, action.payload);
            state.error = validationResult.error;
            state.submitDisabled = validationResult.submitDisabled;
        },
        setShootAroundSpot: (state, action: PayloadAction<ShootAroundSpot>) => {
            state.shootAroundSpot = action.payload;
        },
        resetShootAroundForm: (state) => {
            state.isLoading = false;
            state.submitDisabled = true;
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
    setTotalAttempts,
    setMadeAttempts,
    setShootAroundSpot,
    resetShootAroundForm,
    setAddShootAroundSubmitSuccess
} = addShootAroundSlice.actions;
export const submitShootAround = createAction('add-shoot-around/submitShootAround');
export default addShootAroundReducer;
