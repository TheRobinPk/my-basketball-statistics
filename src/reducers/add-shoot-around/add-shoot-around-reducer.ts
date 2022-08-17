import {ShootAroundSpot} from '../../domain/shoot-around';
import produce from 'immer';

export interface AddShootAroundState {
    totalAttempts: string;
    madeAttempts: string;
    shootAroundSpot?: ShootAroundSpot;
    submitDisabled: boolean;
    isLoading: boolean;
    submitSuccess: boolean;
}

export type AddShootAroundAction =
    | { type: 'setLoading' | 'setSubmitSuccess'; payload: boolean }
    | { type: 'setFormValues'; payload: ShootAroundForm }
    | { type: 'reset' };

type ShootAroundValidationResult = Omit<AddShootAroundState, 'totalAttempts' | 'madeAttempts' | 'isLoading' | 'submitSuccess'>
type ShootAroundForm = Pick<AddShootAroundState, 'totalAttempts' | 'madeAttempts' | 'shootAroundSpot'>;

export const initialState: AddShootAroundState = {
    totalAttempts: '',
    madeAttempts: '',
    shootAroundSpot: undefined,
    submitDisabled: true,
    isLoading: false,
    submitSuccess: false
};

const validateShootAround = (totalAttempts: string, madeAttempts: string, shootAroundSpot: ShootAroundSpot | undefined): ShootAroundValidationResult => {
    if (totalAttempts.length === 0 || madeAttempts.length === 0 || shootAroundSpot === undefined) {
        return {
            submitDisabled: true,
        };
    } else {
        const parsedTotalAttempts = parseInt(totalAttempts);
        const parsedMadeAttempts = parseInt(madeAttempts);

        if (isNaN(parsedTotalAttempts) || parsedTotalAttempts < 0 || isNaN(parsedMadeAttempts) || parsedMadeAttempts < 0) {
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

export const addShootAroundReducer = produce((state: AddShootAroundState, action: AddShootAroundAction) => {
    switch (action.type) {
        case 'setLoading' : {
            state.isLoading = action.payload;
            return;
        }
        case 'setSubmitSuccess': {
            state.submitSuccess = action.payload;
            return;
        }
        case 'setFormValues': {
            const { totalAttempts, madeAttempts, shootAroundSpot } = action.payload;
            state.totalAttempts = totalAttempts;
            state.madeAttempts = madeAttempts;
            state.shootAroundSpot = shootAroundSpot;

            const validationResult = validateShootAround(totalAttempts, madeAttempts, shootAroundSpot);
            state.submitDisabled = validationResult.submitDisabled;
            return;
        }
        case 'reset': {
            state.isLoading = false;
            state.submitDisabled = true;
            state.submitSuccess = false;
            state.totalAttempts = '';
            state.madeAttempts = '';
            state.shootAroundSpot = undefined;
        }
    }
});