import moment from 'moment';
import {ShootAroundSpot} from '../../domain/shoot-around';
import {DateRange} from '../../ui-components/date-picker/date-range-picker';
import produce from 'immer';

export type ShootAroundDataAggregationType = 'week' | 'day' | 'month';

export interface ShootAroundDataSet {
    spot: ShootAroundSpot;
    data: number[];
}

export interface ShootAroundChartData {
    labels: string[];
    dataSets: ShootAroundDataSet[];
}

interface ShootAroundDashboardState {
    isInitialized: boolean;
    dateRange: DateRange;
    dataAggregationType: ShootAroundDataAggregationType;
    shootAroundSpots: ShootAroundSpot[];
    chartData: ShootAroundChartData;
}

type ShootAroundDashboardAction =
    | { type: 'init'; payload: ShootAroundDashboardInit }
    | { type: 'setDateRange'; payload: DateRange }
    | { type: 'setDataAggregationType'; payload: ShootAroundDataAggregationType }
    | { type: 'setShootAroundSpots'; payload: ShootAroundSpot[] }
    | { type: 'setChartData'; payload: ShootAroundChartData };

type ShootAroundDashboardInit = Pick<ShootAroundDashboardState, 'dateRange' | 'dataAggregationType'>;

export const initialState: ShootAroundDashboardState = {
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

export const shootAroundDashboardReducer = produce((state: ShootAroundDashboardState, action: ShootAroundDashboardAction) => {
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