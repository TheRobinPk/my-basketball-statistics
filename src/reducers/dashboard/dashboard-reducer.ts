import moment from 'moment';
import {ShootAroundSpot} from '../../domain/shoot-around';
import {DateRange} from '../../components/common/date-picker/date-range-picker';
import produce from 'immer';

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
    isInitialized: boolean;
    dateRange: DateRange;
    dataAggregationType: DataAggregationType;
    shootAroundSpots: ShootAroundSpot[];
    chartData: ShootAroundChartData;
}

export type DashboardAction =
    | { type: 'init'; payload: DashboardInit }
    | { type: 'setDateRange'; payload: DateRange }
    | { type: 'setDataAggregationType'; payload: DataAggregationType }
    | { type: 'setShootAroundSpots'; payload: ShootAroundSpot[] }
    | { type: 'setChartData'; payload: ShootAroundChartData };

type DashboardInit = Pick<DashboardState, 'dateRange' | 'dataAggregationType'>;

export const initialState: DashboardState = {
    isInitialized: false,
    dateRange: {
        start: moment(),
        end: moment()
    },
    dataAggregationType: 'day',
    shootAroundSpots: [],
    chartData: {
        labels: [],
        dataSets: []
    }
};

export const dashboardReducer = produce((state: DashboardState, action: DashboardAction) => {
    switch (action.type) {
        case 'init': {
            state.dataAggregationType = action.payload.dataAggregationType;
            state.dateRange = action.payload.dateRange;
            state.isInitialized = true;
            return;
        }
        case 'setDateRange': {
            state.dateRange = action.payload;
            return;
        }
        case 'setDataAggregationType': {
            state.dataAggregationType = action.payload;
            return;
        }
        case 'setShootAroundSpots': {
            state.shootAroundSpots = action.payload;
            return;
        }
        case 'setChartData': {
            state.chartData = action.payload;
            return;
        }
    }
});