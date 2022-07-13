import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataSource} from 'typeorm';
import {ShootAroundEntity} from '../../../domain/shoot-around';
import ShootAroundService from '../../../service/shoot-around-service';

export interface ApplicationState {
    applicationInitialized: boolean;
    dataSource?: DataSource;
    shootAroundService?: ShootAroundService;
}

export const initialState: ApplicationState = {
    applicationInitialized: false,
    dataSource: undefined
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        initializeApplication: (state) => {
            state.applicationInitialized = true;
        },
        setApplicationDataSource: (state, action: PayloadAction<DataSource>) => {
            const dataSource = action.payload;
            const repository = dataSource.getRepository(ShootAroundEntity);
            state.dataSource = dataSource;
            state.shootAroundService = new ShootAroundService(repository);
        }
    }
});

const applicationReducer = applicationSlice.reducer;

export const {
    initializeApplication,
    setApplicationDataSource,
} = applicationSlice.actions;
export const applicationMounted = createAction('application/applicationMounted');
export default applicationReducer;
