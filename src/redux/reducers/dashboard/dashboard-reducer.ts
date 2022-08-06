import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShootAroundSpot} from '../../../domain/shoot-around';
import {DateRange} from '../../../components/common/date-picker/date-range-picker';
import moment from 'moment';

export type DataAggregationType = 'week' | 'day' | 'month';

export interface ShootAroundDataSet {
    spot: ShootAroundSpot;
    data: number[];
}

export interface ShootAroundChartData {
    labels: string[];
    dataSets: ShootAroundDataSet[];
}

export interface DashboardState {
    isLoading: boolean,
    dateRange: DateRange,
    dataAggregationType: DataAggregationType,
    shootAroundSpots: ShootAroundSpot[];
    chartData: ShootAroundChartData | undefined;
}

export const initialState: DashboardState = {
    isLoading: true,
    dateRange: {
        start: moment(),
        end: moment()
    },
    dataAggregationType: 'week',
    shootAroundSpots: [],
    chartData: undefined
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setDashboardDateRange: (state, action: PayloadAction<DateRange>) => {
            state.dateRange = action.payload;
        },
        setDashboardDataAggregationType: (state, action: PayloadAction<DataAggregationType>) => {
            state.dataAggregationType = action.payload;
        },
        setDashboardShootAroundSpots: (state, action: PayloadAction<ShootAroundSpot[]>) => {
            state.shootAroundSpots = action.payload;
        },
        setDashboardChartData: (state, action: PayloadAction<ShootAroundChartData>) => {
            state.chartData = action.payload;
        }
    }
});

const dashboardReducer = dashboardSlice.reducer;

export const {
    setDashboardIsLoading,
    setDashboardDateRange,
    setDashboardDataAggregationType,
    setDashboardShootAroundSpots,
    setDashboardChartData
} = dashboardSlice.actions;
export default dashboardReducer;
