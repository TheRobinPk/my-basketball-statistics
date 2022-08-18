import {DataSource} from 'typeorm';
import ShootAroundService from '../../service/shoot-around-service';
import ShootAroundChartService from '../../service/shoot-around-chart-service';
import produce from 'immer';
import {ShootAroundEntity} from '../../domain/shoot-around';

export interface ApplicationState {
    applicationInitialized: boolean;
    dataSource?: DataSource;
    shootAroundService?: ShootAroundService;
    shootAroundChartService?: ShootAroundChartService;
}

export const initialState: ApplicationState = {
    applicationInitialized: false,
    dataSource: undefined,
    shootAroundService: undefined,
    shootAroundChartService: undefined,
};

export type ApplicationAction =
    | { type: 'init' | 'setSubmitSuccess'; payload: DataSource };

export const applicationReducer = produce((state: ApplicationState, action: ApplicationAction) => {
    switch (action.type) {
        case 'init': {
            const dataSource = action.payload;
            const repository = dataSource.getRepository(ShootAroundEntity);
            state.dataSource = dataSource;
            state.shootAroundService = new ShootAroundService(repository);
            state.shootAroundChartService = new ShootAroundChartService();

            state.applicationInitialized = true;
            return;
        }
    }
});