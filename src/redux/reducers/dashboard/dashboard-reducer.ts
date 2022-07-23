import {DateRange} from '../../../components/common/date-time-range-picker/date-range-picker';
import moment from 'moment';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShootAround} from '../../../domain/shoot-around';

export interface DashboardState {
    isLoading: boolean,
    selectedRange: DateRange,
    shootArounds: ShootAround[];
}

export const initialState: DashboardState = {
    isLoading: true,
    selectedRange: {
        start: moment(),
        end: moment(),
    },
    shootArounds: []
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setDashboardSelectedRange: (state, action: PayloadAction<DateRange>) => {
            state.selectedRange = action.payload;
        },
        setDashboardShootArounds: (state, action: PayloadAction<ShootAround[]>) => {
            state.shootArounds = [...action.payload];
        }
    }
});

const dashboardReducer = dashboardSlice.reducer;

export const {
    setDashboardIsLoading,
    setDashboardSelectedRange,
    setDashboardShootArounds
} = dashboardSlice.actions;
export default dashboardReducer;
