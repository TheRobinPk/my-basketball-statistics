import createMockInstance from 'jest-create-mock-instance';
import BasketballSeasonService from './basketball-season-service';
import {BasketballSeason, BasketballSeasonEntity} from '../../domain/basketball-season';
import {Repository} from 'typeorm/repository/Repository';
import moment from 'moment';

let repository: jest.Mocked<Repository<BasketballSeasonEntity>>;
let basketballSeasonService: BasketballSeasonService;

const DATE = moment();

const BASKETBALL_SEASONS: BasketballSeasonEntity[] = [
    {
        id: 1,
        timestamp: DATE.unix(),
        name: '2021/22'
    },
    {
        id: 2,
        timestamp: DATE.unix(),
        name: '2022/23'
    }
];

describe('basketball-season-service', () => {
    beforeEach(() => {
        repository = createMockInstance<Repository<BasketballSeasonEntity>>(Repository);
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
            return new Promise<BasketballSeasonEntity[]>((resolve) => resolve(BASKETBALL_SEASONS));
        });
        basketballSeasonService = new BasketballSeasonService(repository);
    });

    it('should transform the input to an entity and call the repository', () => {
        // GIVEN
        const basketballSeason: BasketballSeason = {
            name: '2023/24',
            dateTime: DATE
        };

        // WHEN
        basketballSeasonService.insert(basketballSeason);

        // THEN
        const expectedEntity: BasketballSeasonEntity = new BasketballSeasonEntity();
        expectedEntity.name = '2023/24';
        expectedEntity.timestamp = DATE.unix();
        expect(repository.insert).toHaveBeenCalledTimes(1);
        expect(repository.insert).toHaveBeenCalledWith(expectedEntity);
    });

    it('should update the entity by id', () => {
        // GIVEN
        const basketballSeason: BasketballSeason = {
            name: '2023/24',
            dateTime: DATE
        };

        // WHEN
        basketballSeasonService.update(1, basketballSeason);

        // THEN
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledWith(1, {
            name: '2023/24'
        });
    });

    it('should delete the entity by id', () => {
        // GIVEN

        // WHEN
        basketballSeasonService.delete(1);

        // THEN
        expect(repository.delete).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should find all BasketballSeasons ordered by timestamp DESC', async () => {
        // GIVEN

        // WHEN
        const result = await basketballSeasonService.findAll();

        // THEN
        expect(repository.find).toHaveBeenCalledTimes(1);
        expect(repository.find).toHaveBeenCalledWith({
            order: {
                timestamp: 'DESC'
            }
        });

        expect(result.length).toEqual(2);

        expect(result[0].id).toEqual(1);
        expect(result[0].name).toEqual('2021/22');

        expect(result[1].id).toEqual(2);
        expect(result[1].name).toEqual('2022/23');
    });
});