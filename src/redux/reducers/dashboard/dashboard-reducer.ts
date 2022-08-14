import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    dataAggregationType: DataAggregationType | undefined,
    shootAroundSpots: ShootAroundSpot[];
    chartData: ShootAroundChartData | undefined;
}

type DashboardInit = Pick<DashboardState, 'dateRange' | 'dataAggregationType'>;

export const initialState: DashboardState = {
    isLoading: true,
    dateRange: {
        start: moment(),
        end: moment()
    },
    dataAggregationType: undefined,
    shootAroundSpots: [],
    chartData: undefined
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        initDashboard: (state, action: PayloadAction<DashboardInit>) => {
            state.dataAggregationType = action.payload.dataAggregationType;
            state.dateRange = action.payload.dateRange;
        },
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
    initDashboard,
    setDashboardIsLoading,
    setDashboardDateRange,
    setDashboardDataAggregationType,
    setDashboardShootAroundSpots,
    setDashboardChartData
} = dashboardSlice.actions;
export const getDashboardChartData = createAction('dashboard/getDashboardChartData');
export default dashboardReducer;
