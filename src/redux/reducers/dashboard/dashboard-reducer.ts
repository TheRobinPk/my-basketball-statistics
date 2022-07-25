import {DateRange} from '../../../components/common/date-time-range-picker/date-range-picker';
import moment from 'moment';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShootAroundSpot} from '../../../domain/shoot-around';
import {Moment} from 'moment/moment';

export interface ShootAroundAggregatedResult {
    spot: ShootAroundSpot;
    day: Moment;
    totalAttempts: number;
    madeAttempts: number;
}

export interface DashboardState {
    isLoading: boolean,
    selectedRange: DateRange,
    selectedFilterSpots: ShootAroundSpot[];
    aggregatedValues: ShootAroundAggregatedResult[];
}

export const initialState: DashboardState = {
    isLoading: true,
    selectedRange: {
        start: moment(),
        end: moment(),
    },
    selectedFilterSpots: [],
    aggregatedValues: []
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
        setDashboardSelectedFilterSpots: (state, action:PayloadAction<ShootAroundSpot[]>) => {
            state.selectedFilterSpots = action.payload;
        },
        setDashboardAggregatedValues: (state, action: PayloadAction<ShootAroundAggregatedResult[]>) => {
            state.aggregatedValues = [...action.payload];
        }
    }
});

const dashboardReducer = dashboardSlice.reducer;

export const {
    setDashboardIsLoading,
    setDashboardSelectedRange,
    setDashboardSelectedFilterSpots,
    setDashboardAggregatedValues
} = dashboardSlice.actions;
export default dashboardReducer;
