import createMockInstance from 'jest-create-mock-instance';
import {Repository} from 'typeorm/repository/Repository';
import {ShootAround, ShootAroundEntity, ShootAroundSpot} from '../domain/shoot-around';
import ShootAroundService from './shoot-around-service';
import moment from 'moment';

let repository: jest.Mocked<Repository<ShootAroundEntity>>;
let shootAroundService: ShootAroundService;

describe('shoot-around-service', () => {
    beforeEach(() => {
        repository = createMockInstance<Repository<ShootAroundEntity>>(Repository);
        (repository as any).insert = jest.fn(() => {
            return new Promise<void>((resolve) => resolve());
        });
        shootAroundService = new ShootAroundService(repository);
    });

    it('should transform the input to an entity and call the repository ', () => {
        // GIVEN
        const dateTime = moment.utc();
        const shootAround: ShootAround = {
            totalAttempts: 10,
            madeAttempts: 5,
            spot: ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
            dateTime: dateTime
        };

        // WHEN
        shootAroundService.insert(shootAround);

        // THEN
        const expectedEntity: ShootAroundEntity = new ShootAroundEntity();
        expectedEntity.spot = ShootAroundSpot.MID_RANGE_RIGHT_CORNER.toString();
        expectedEntity.totalAttempts = 10;
        expectedEntity.madeAttempts = 5;
        expectedEntity.timestamp = dateTime.unix();
        expect(repository.insert).toHaveBeenCalledTimes(1);
        expect(repository.insert).toHaveBeenCalledWith(expectedEntity);
    });
});