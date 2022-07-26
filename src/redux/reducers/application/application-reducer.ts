import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataSource} from 'typeorm';
import {ShootAroundEntity} from '../../../domain/shoot-around';
import ShootAroundService from '../../../service/shoot-around-service';
import ShootAroundChartService from '../../../service/shoot-around-chart-service';

export interface ApplicationState {
    applicationInitialized: boolean;
    dataSource?: DataSource;
    shootAroundService?: ShootAroundService;
    shootAroundChartService?: ShootAroundChartService;
}

export const initialState: ApplicationState = {
    applicationInitialized: false,
    dataSource: undefined
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        initializeApplication: (state, action: PayloadAction<DataSource>) => {
            const dataSource = action.payload;
            const repository = dataSource.getRepository(ShootAroundEntity);
            state.dataSource = dataSource;
            state.shootAroundService = new ShootAroundService(repository);
            state.shootAroundChartService = new ShootAroundChartService();

            state.applicationInitialized = true;
        }
    }
});

const applicationReducer = applicationSlice.reducer;

export const {
    initializeApplication
} = applicationSlice.actions;
export const applicationMounted = createAction('application/applicationMounted');
export default applicationReducer;
