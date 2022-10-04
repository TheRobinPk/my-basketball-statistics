import createMockInstance from 'jest-create-mock-instance';
import {Repository} from 'typeorm/repository/Repository';
import moment from 'moment';
import {BasketballGame, BasketballGameEntity, BasketballGameOutcome, BasketballGameType} from '../../domain/basketball-game';
import BasketballGameService from './basketball-game-service';
import {BasketballTeamEntity} from '../../domain/basketball-team';
import {BasketballSeasonEntity} from '../../domain/basketball-season';
import BasketballTeamService from './basketball-team-service';
import BasketballSeasonService from './basketball-season-service';

let basketballSeasonService: jest.Mocked<BasketballSeasonService>;
let basketballTeamService: jest.Mocked<BasketballTeamService>;
let repository: jest.Mocked<Repository<BasketballGameEntity>>;
let basketballGameService: BasketballGameService;

const DATE = moment();

const BASKETBALL_SEASON: BasketballSeasonEntity = {
    id: 1,
    timestamp: DATE.unix(),
    name: '2022/23'
};

const BASKETBALL_TEAM: BasketballTeamEntity = {
    id: 1,
    timestamp: DATE.unix(),
    name: 'TEAM'
};

const BASKETBALL_GAMES: BasketballGameEntity[] = [
    {
        id: 1,
        timestamp: DATE.unix(),
        gameType: BasketballGameType.COMPLETE.toString(),
        opponentName: 'OPP#1',
        gameOutcome: BasketballGameOutcome.WON.toString(),
        finalScore: 50,
        finalScoreOpponent: 40,
        played: true,
        started: true,
        minutesPlayed: 38,
        fieldGoalAttempts: 6,
        fieldGoalsMade: 6,
        fieldGoalAttemptsThree: 5,
        fieldGoalsMadeThree: 5,
        freeThrowAttempts: 3,
        freeThrowsMade: 3,
        offensiveRebounds: 5,
        defensiveRebounds: 5,
        assists: 4,
        blocks: 3,
        steals: 2,
        turnovers: 1,
        fouls: 0,
        points: 20,
        team: BASKETBALL_TEAM,
        season: BASKETBALL_SEASON
    },
    {
        id: 2,
        timestamp: DATE.unix(),
        gameType: BasketballGameType.COMPLETE.toString(),
        opponentName: 'OPP#2',
        gameOutcome: BasketballGameOutcome.LOST.toString(),
        finalScore: 50,
        finalScoreOpponent: 60,
        played: true,
        started: true,
        minutesPlayed: 20,
        fieldGoalAttempts: 10,
        fieldGoalsMade: 5,
        fieldGoalAttemptsThree: 3,
        fieldGoalsMadeThree: 1,
        freeThrowAttempts: 6,
        freeThrowsMade: 4,
        offensiveRebounds: 2,
        defensiveRebounds: 6,
        assists: 5,
        blocks: 4,
        steals: 3,
        turnovers: 2,
        fouls: 1,
        points: 15,
        team: BASKETBALL_TEAM,
        season: BASKETBALL_SEASON
    }
];

describe('basketball-game-service', () => {
    beforeEach(() => {
        basketballSeasonService = createMockInstance<BasketballSeasonService>(BasketballSeasonService);
        basketballTeamService = createMockInstance<BasketballTeamService>(BasketballTeamService);
        repository = createMockInstance<Repository<BasketballGameEntity>>(Repository);
        (basketballSeasonService as any).findEntityById = jest.fn(() => {
            return new Promise<BasketballSeasonEntity>((resolve) => resolve(BASKETBALL_SEASON));
        });
        (basketballTeamService as any).findEntityById = jest.fn(() => {
            return new Promise<BasketballTeamEntity>((resolve) => resolve(BASKETBALL_TEAM));
        });
        (repository as any).insert = jest.fn(() => {
            return new Promise<void>((resolve) => resolve());
        });
        (repository as any).update = jest.fn(() => {
            return new Promise<void>((resolve) => resolve());
        });
        (repository as any).delete = jest.fn(() => {
            return new Promise<void>((resolve) => resolve());
        });
        (repository as any).find = jest.fn(() => {
            return new Promise<BasketballGameEntity[]>((resolve) => resolve(BASKETBALL_GAMES));
        });
        basketballGameService = new BasketballGameService(repository, basketballSeasonService, basketballTeamService);
    });

    it('should transform the input to an entity and call the repository', async () => {
        // GIVEN
        const basketballGame: BasketballGame = {
            dateTime: DATE,
            gameType: BasketballGameType.COMPLETE,
            opponentName: 'OPP#2',
            gameOutcome: BasketballGameOutcome.WON,
            finalScore: 50,
            finalScoreOpponent: 30,
            played: true,
            started: true,
            minutesPlayed: 30,
            fieldGoalAttempts: 10,
            fieldGoalsMade: 8,
            fieldGoalAttemptsThree: 2,
            fieldGoalsMadeThree: 1,
            freeThrowAttempts: 4,
            freeThrowsMade: 2,
            offensiveRebounds: 2,
            defensiveRebounds: 6,
            assists: 5,
            blocks: 4,
            steals: 3,
            turnovers: 2,
            fouls: 1,
            points: 19,
            seasonId: 1,
            teamId: 1
        };

        // WHEN
        await basketballGameService.insert(basketballGame);

        // THEN
        const expectedEntity: BasketballGameEntity = new BasketballGameEntity();
        expectedEntity.timestamp = DATE.unix();
        expectedEntity.gameType = BasketballGameType.COMPLETE.toString();
        expectedEntity.opponentName = 'OPP#2';
        expectedEntity.gameOutcome = BasketballGameOutcome.WON.toString();
        expectedEntity.finalScore = 50;
        expectedEntity.finalScoreOpponent = 30;
        expectedEntity.played = true;
        expectedEntity.started = true;
        expectedEntity.minutesPlayed = 30;
        expectedEntity.fieldGoalAttempts = 10;
        expectedEntity.fieldGoalsMade = 8;
        expectedEntity.fieldGoalAttemptsThree = 2;
        expectedEntity.fieldGoalsMadeThree = 1;
        expectedEntity.freeThrowAttempts = 4;
        expectedEntity.freeThrowsMade = 2;
        expectedEntity.offensiveRebounds = 2;
        expectedEntity.defensiveRebounds = 6;
        expectedEntity.assists = 5;
        expectedEntity.blocks = 4;
        expectedEntity.steals = 3;
        expectedEntity.turnovers = 2;
        expectedEntity.fouls = 1;
        expectedEntity.points = 19;
        expectedEntity.season = BASKETBALL_SEASON;
        expectedEntity.team = BASKETBALL_TEAM;

        expect(basketballSeasonService.findEntityById).toHaveBeenCalledTimes(1);
        expect(basketballSeasonService.findEntityById).toHaveBeenCalledWith(1);
        expect(basketballTeamService.findEntityById).toHaveBeenCalledTimes(1);
        expect(basketballTeamService.findEntityById).toHaveBeenCalledWith(1);

        expect(repository.insert).toHaveBeenCalledTimes(1);
        expect(repository.insert).toHaveBeenCalledWith(expectedEntity);
    });

    it('should update the entity by id', () => {
        // GIVEN
        const basketballGame: BasketballGame = {
            dateTime: DATE,
            gameType: BasketballGameType.COMPLETE,
            opponentName: 'OPP#2',
            gameOutcome: BasketballGameOutcome.WON,
            finalScore: 50,
            finalScoreOpponent: 30,
            played: true,
            started: true,
            minutesPlayed: 30,
            fieldGoalAttempts: 10,
            fieldGoalsMade: 8,
            fieldGoalAttemptsThree: 2,
            fieldGoalsMadeThree: 1,
            freeThrowAttempts: 4,
            freeThrowsMade: 2,
            offensiveRebounds: 2,
            defensiveRebounds: 6,
            assists: 5,
            blocks: 4,
            steals: 3,
            turnovers: 2,
            fouls: 1,
            points: 19,
            seasonId: 1,
            teamId: 1
        };

        // WHEN
        basketballGameService.update(1, basketballGame);

        // THEN
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledWith(1, {
            gameType: BasketballGameType.COMPLETE.toString(),
            opponentName: 'OPP#2',
            gameOutcome: BasketballGameOutcome.WON.toString(),
            finalScore: 50,
            finalScoreOpponent: 30,
            played: true,
            started: true,
            minutesPlayed: 30,
            fieldGoalAttempts: 10,
            fieldGoalsMade: 8,
            fieldGoalAttemptsThree: 2,
            fieldGoalsMadeThree: 1,
            freeThrowAttempts: 4,
            freeThrowsMade: 2,
            offensiveRebounds: 2,
            defensiveRebounds: 6,
            assists: 5,
            blocks: 4,
            steals: 3,
            turnovers: 2,
            fouls: 1,
            points: 19
        });
    });

    it('should delete the entity by id', () => {
        // GIVEN

        // WHEN
        basketballGameService.delete(1);

        // THEN
        expect(repository.delete).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should find all BasketballGames ordered by timestamp DESC', async () => {
        // GIVEN

        // WHEN
        const result = await basketballGameService.findAll();

        // THEN
        expect(repository.find).toHaveBeenCalledTimes(1);
        expect(repository.find).toHaveBeenCalledWith({
            order: {
                timestamp: 'DESC'
            }
        });

        expect(result.length).toEqual(2);

        expect(result[0].id).toEqual(1);
        expect(result[0].opponentName).toEqual('OPP#1');

        expect(result[1].id).toEqual(2);
        expect(result[1].opponentName).toEqual('OPP#2');
    });
});