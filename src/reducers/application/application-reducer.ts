import {DataSource} from 'typeorm';
import ShootAroundService from '../../service/shoot-around/shoot-around-service';
import ShootAroundChartService from '../../service/shoot-around/shoot-around-chart-service';
import produce from 'immer';
import {ShootAroundEntity} from '../../domain/shoot-around';
import {BasketballGameEntity} from '../../domain/basketball-game';
import {BasketballSeasonEntity} from '../../domain/basketball-season';
import {BasketballTeamEntity} from '../../domain/basketball-team';
import BasketballSeasonService from '../../service/basketball-game/basketball-season-service';
import BasketballTeamService from '../../service/basketball-game/basketball-team-service';
import BasketballGameService from '../../service/basketball-game/basketball-game-service';

export interface ApplicationState {
    applicationInitialized: boolean;
    dataSource?: DataSource;
    shootAroundService?: ShootAroundService;
    shootAroundChartService?: ShootAroundChartService;
    basketballSeasonService?: BasketballSeasonService;
    basketballTeamService?: BasketballTeamService;
    basketballGameService?: BasketballGameService;
}

export const initialState: ApplicationState = {
    applicationInitialized: false,
    dataSource: undefined,
    shootAroundService: undefined,
    shootAroundChartService: undefined,
    basketballSeasonService: undefined,
    basketballTeamService: undefined,
    basketballGameService: undefined,
};

export type ApplicationAction =
    | { type: 'init' | 'setSubmitSuccess'; payload: DataSource };

export const applicationReducer = produce((state: ApplicationState, action: ApplicationAction) => {
    switch (action.type) {
        case 'init': {
            const dataSource = action.payload;
            state.dataSource = dataSource;
            const shootAroundRepository = dataSource.getRepository(ShootAroundEntity);
            const basketballSeasonRepository = dataSource.getRepository(BasketballSeasonEntity);
            const basketballTeamRepository = dataSource.getRepository(BasketballTeamEntity);
            const basketballGameRepository = dataSource.getRepository(BasketballGameEntity);

            state.shootAroundService = new ShootAroundService(shootAroundRepository);
            state.shootAroundChartService = new ShootAroundChartService();

            state.basketballSeasonService = new BasketballSeasonService(basketballSeasonRepository);
            state.basketballTeamService = new BasketballTeamService(basketballTeamRepository);
            state.basketballGameService = new BasketballGameService(
                basketballGameRepository,
                state.basketballSeasonService,
                state.basketballTeamService
            );

            state.applicationInitialized = true;
            return;
        }
    }
});