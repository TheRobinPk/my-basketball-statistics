import {ShootAround} from '../../../domain/shoot-around';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ShootAroundListState {
    isLoading: boolean;
    data: ShootAround[]
}

export const initialState: ShootAroundListState = {
    isLoading: true,
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
            state.isLoading = true;
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
export const deleteShootAround = createAction<number>('shoot-around-list/deleteShootAround');
export default shootAroundListReducer;