import {Repository} from 'typeorm/repository/Repository';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';
import {BasketballGame, BasketballGameEntity, BasketballGameOutcome, BasketballGameType} from '../../domain/basketball-game';
import BasketballSeasonService from './basketball-season-service';
import BasketballTeamService from './basketball-team-service';
import {AbstractCrudService} from '../abstract-crud-service';
import moment from 'moment';

export default class BasketballGameService extends AbstractCrudService<BasketballGameEntity, BasketballGame>{
    private basketballSeasonService: BasketballSeasonService;
    private basketballTeamService: BasketballTeamService;

    constructor(
        repository: Repository<BasketballGameEntity>,
        basketballSeasonService: BasketballSeasonService,
        basketballTeamService: BasketballTeamService
    ) {
        super(repository);
        this.basketballSeasonService = basketballSeasonService;
        this.basketballTeamService = basketballTeamService;
    }

    async insert(basketballGame: BasketballGame) {
        const season = await this.basketballSeasonService.findEntityById(basketballGame.seasonId);
        const team = await this.basketballTeamService.findEntityById(basketballGame.teamId);

        return new Promise<void>((resolve) => {
            const entity = this.mapTypeToEntity(basketballGame);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            entity.season = season!;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            entity.team = team!;
            this.repository.insert(entity)
                .then(() => {
                    resolve();
                });
        });
    }

    protected getPartialEntity(basketballGame: BasketballGame): QueryDeepPartialEntity<BasketballGameEntity> {
        return {
            gameType: basketballGame.gameType.toString(),
            opponentName: basketballGame.opponentName,
            gameOutcome: basketballGame.gameOutcome.toString(),
            finalScore: basketballGame.finalScore,
            finalScoreOpponent: basketballGame.finalScoreOpponent,
            played: basketballGame.played,
            started: basketballGame.started,
            minutesPlayed: basketballGame.minutesPlayed,
            fieldGoalAttempts: basketballGame.fieldGoalAttempts,
            fieldGoalsMade: basketballGame.fieldGoalsMade,
            fieldGoalAttemptsThree: basketballGame.fieldGoalAttemptsThree,
            fieldGoalsMadeThree: basketballGame.fieldGoalsMadeThree,
            freeThrowAttempts: basketballGame.freeThrowAttempts,
            freeThrowsMade: basketballGame.freeThrowsMade,
            offensiveRebounds: basketballGame.offensiveRebounds,
            defensiveRebounds: basketballGame.defensiveRebounds,
            assists: basketballGame.assists,
            blocks: basketballGame.blocks,
            steals: basketballGame.steals,
            turnovers: basketballGame.turnovers,
            fouls: basketballGame.fouls,
            points: basketballGame.points
        };
    }

    protected mapEntityToType(entity: BasketballGameEntity): BasketballGame {
        return {
            id: entity.id,
            dateTime: moment.unix(entity.timestamp),
            gameType: entity.gameType as unknown as BasketballGameType,
            opponentName: entity.opponentName,
            gameOutcome: entity.gameOutcome as unknown as BasketballGameOutcome,
            finalScore: entity.finalScore,
            finalScoreOpponent: entity.finalScoreOpponent,
            played: entity.played,
            started: entity.started,
            minutesPlayed: entity.minutesPlayed,
            fieldGoalAttempts: entity.fieldGoalAttempts,
            fieldGoalsMade: entity.fieldGoalsMade,
            fieldGoalAttemptsThree: entity.fieldGoalAttemptsThree,
            fieldGoalsMadeThree: entity.fieldGoalsMadeThree,
            freeThrowAttempts: entity.freeThrowAttempts,
            freeThrowsMade: entity.freeThrowsMade,
            offensiveRebounds: entity.offensiveRebounds,
            defensiveRebounds: entity.defensiveRebounds,
            assists: entity.assists,
            blocks: entity.blocks,
            steals: entity.steals,
            turnovers: entity.turnovers,
            fouls: entity.fouls,
            points: entity.points,
            seasonId: entity.season.id,
            teamId: entity.team.id
        };
    }

    protected mapTypeToEntity(basketballGame: BasketballGame): BasketballGameEntity {
        const entity = new BasketballGameEntity();
        entity.timestamp = basketballGame.dateTime.unix();
        entity.gameType = basketballGame.gameType.toString();
        entity.opponentName = basketballGame.opponentName;
        entity.gameOutcome = basketballGame.gameOutcome.toString();
        entity.finalScore = basketballGame.finalScore;
        entity.finalScoreOpponent = basketballGame.finalScoreOpponent;
        entity.played = basketballGame.played;
        entity.started = basketballGame.started;
        entity.minutesPlayed = basketballGame.minutesPlayed;
        entity.fieldGoalAttempts = basketballGame.fieldGoalAttempts;
        entity.fieldGoalsMade = basketballGame.fieldGoalsMade;
        entity.fieldGoalAttemptsThree = basketballGame.fieldGoalAttemptsThree;
        entity.fieldGoalsMadeThree = basketballGame.fieldGoalsMadeThree;
        entity.freeThrowAttempts = basketballGame.freeThrowAttempts;
        entity.freeThrowsMade = basketballGame.freeThrowsMade;
        entity.offensiveRebounds = basketballGame.offensiveRebounds;
        entity.defensiveRebounds = basketballGame.defensiveRebounds;
        entity.assists = basketballGame.assists;
        entity.blocks = basketballGame.blocks;
        entity.steals = basketballGame.steals;
        entity.turnovers = basketballGame.turnovers;
        entity.fouls = basketballGame.fouls;
        entity.points = basketballGame.points;
        return entity;
    }
}
