import createMockInstance from 'jest-create-mock-instance';
import BasketballTeamService from './basketball-team-service';
import {BasketballTeam, BasketballTeamEntity} from '../../domain/basketball-team';
import {Repository} from 'typeorm/repository/Repository';
import moment from 'moment';

let repository: jest.Mocked<Repository<BasketballTeamEntity>>;
let basketballTeamService: BasketballTeamService;

const DATE = moment();

const BASKETBALL_TEAMS: BasketballTeamEntity[] = [
    {
        id: 1,
        timestamp: DATE.unix(),
        name: 'Lakers'
    },
    {
        id: 2,
        timestamp: DATE.unix(),
        name: 'Warriors'
    }
];

describe('basketball-team-service', () => {
    beforeEach(() => {
        repository = createMockInstance<Repository<BasketballTeamEntity>>(Repository);
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
            return new Promise<BasketballTeamEntity[]>((resolve) => resolve(BASKETBALL_TEAMS));
        });
        basketballTeamService = new BasketballTeamService(repository);
    });

    it('should transform the input to an entity and call the repository', () => {
        // GIVEN
        const basketballTeam: BasketballTeam = {
            name: 'Bucks',
            dateTime: DATE
        };

        // WHEN
        basketballTeamService.insert(basketballTeam);

        // THEN
        const expectedEntity: BasketballTeamEntity = new BasketballTeamEntity();
        expectedEntity.name = 'Bucks';
        expectedEntity.timestamp = DATE.unix();
        expect(repository.insert).toHaveBeenCalledTimes(1);
        expect(repository.insert).toHaveBeenCalledWith(expectedEntity);
    });

    it('should update the entity by id', () => {
        // GIVEN
        const basketballTeam: BasketballTeam = {
            name: 'Bucks',
            dateTime: DATE
        };

        // WHEN
        basketballTeamService.update(1, basketballTeam);

        // THEN
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledWith(1, {
            name: 'Bucks'
        });
    });

    it('should delete the entity by id', () => {
        // GIVEN

        // WHEN
        basketballTeamService.delete(1);

        // THEN
        expect(repository.delete).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should find all BasketballTeams ordered by timestamp DESC', async () => {
        // GIVEN

        // WHEN
        const result = await basketballTeamService.findAll();

        // THEN
        expect(repository.find).toHaveBeenCalledTimes(1);
        expect(repository.find).toHaveBeenCalledWith({
            order: {
                timestamp: 'DESC'
            }
        });

        expect(result.length).toEqual(2);

        expect(result[0].id).toEqual(1);
        expect(result[0].name).toEqual('Lakers');

        expect(result[1].id).toEqual(2);
        expect(result[1].name).toEqual('Warriors');
    });
});