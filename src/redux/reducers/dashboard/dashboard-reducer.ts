import {DateRange} from '../../../components/common/date-time-range-picker/date-range-picker';
import moment from 'moment';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShootAroundSpot} from '../../../domain/shoot-around';
import {ShootAroundChartData} from '../../../service/shoot-around-chart-service';

export type ChartDataGroupBy = 'week' | 'day' | 'month';

export interface DashboardState {
    isLoading: boolean,
    selectedRange: DateRange,
    selectedGrouping: ChartDataGroupBy,
    selectedFilterSpots: ShootAroundSpot[];
    chartData: ShootAroundChartData | undefined;
}

export const initialState: DashboardState = {
    isLoading: true,
    selectedRange: {
        start: moment(),
        end: moment(),
    },
    selectedGrouping: 'week',
    selectedFilterSpots: [],
    chartData: undefined
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setDashboardSelectedRange: (state, action: PayloadAction<DateRange>) => {
            state.selectedRange.start = action.payload.start.startOf(state.selectedGrouping);
            state.selectedRange.end = action.payload.end.endOf(state.selectedGrouping);
        },
        setDashboardSelectedGrouping: (state, action: PayloadAction<ChartDataGroupBy>) => {
            state.selectedGrouping = action.payload;
            state.selectedRange.start = state.selectedRange.start.startOf(action.payload);
            state.selectedRange.end = state.selectedRange.end.endOf(action.payload);
        },
        setDashboardSelectedFilterSpots: (state, action: PayloadAction<ShootAroundSpot[]>) => {
            state.selectedFilterSpots = action.payload;
        },
        setDashboardChartData: (state, action: PayloadAction<ShootAroundChartData>) => {
            state.chartData = action.payload;
        }
    }
});

const dashboardReducer = dashboardSlice.reducer;

export const {
    setDashboardIsLoading,
    setDashboardSelectedRange,
    setDashboardSelectedFilterSpots,
    setDashboardChartData
} = dashboardSlice.actions;
export default dashboardReducer;
