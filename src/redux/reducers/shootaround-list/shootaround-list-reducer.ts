import {ShootAround} from '../../../domain/shoot-around';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ShootaroundListState {
    isLoading: boolean;
    data: ShootAround[]
}

export const initialState: ShootaroundListState = {
    isLoading: false,
    data: []
};

const shootAroundListSlice = createSlice({
    name: 'shoot-around-list',
    initialState,
    reducers: {
        setShootAroundListIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setShootAroundListData: (state, action: PayloadAction<ShootAround[]>) => {
            state.data = action.payload;
        },
        resetShootAroundList: (state) => {
            state.isLoading = false;
            state.data = [];
        }
    }
});

const shootAroundListReducer = shootAroundListSlice.reducer;
export const {
    setShootAroundListIsLoading,
    setShootAroundListData,
    resetShootAroundList
} = shootAroundListSlice.actions;
export const getShootAroundListData = createAction('shoot-around-list/getShootAroundListData');
export default shootAroundListReducer;