import createMockInstance from 'jest-create-mock-instance';
import {Repository} from 'typeorm/repository/Repository';
import {ShootAround, ShootAroundEntity, ShootAroundSpot} from '../domain/shoot-around';
import ShootAroundService from './shoot-around-service';
import moment from 'moment';
import {Between, In} from 'typeorm';

let repository: jest.Mocked<Repository<ShootAroundEntity>>;
let shootAroundService: ShootAroundService;

const DATE = moment();

const DUMMY_SHOOT_AROUNDS: ShootAroundEntity[] = [
    {
        id: 1,
        timestamp: DATE.unix(),
        totalAttempts: 20,
        madeAttempts: 14,
        spot: ShootAroundSpot.FREE_THROW.toString()
    },
    {
        id: 2,
        timestamp: DATE.unix(),
        totalAttempts: 20,
        madeAttempts: 8,
        spot: ShootAroundSpot.THREE_POINT_RIGHT_WING.toString()
    }
];

describe('shoot-around-service', () => {
    beforeEach(() => {
        repository = createMockInstance<Repository<ShootAroundEntity>>(Repository);
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
            return new Promise<ShootAroundEntity[]>((resolve) => resolve(DUMMY_SHOOT_AROUNDS));
        });
        shootAroundService = new ShootAroundService(repository);
    });

    it('should transform the input to an entity and call the repository', () => {
        // GIVEN
        const shootAround: ShootAround = {
            totalAttempts: 10,
            madeAttempts: 5,
            spot: ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
            dateTime: DATE
        };

        // WHEN
        shootAroundService.insert(shootAround);

        // THEN
        const expectedEntity: ShootAroundEntity = new ShootAroundEntity();
        expectedEntity.spot = ShootAroundSpot.MID_RANGE_RIGHT_CORNER.toString();
        expectedEntity.totalAttempts = 10;
        expectedEntity.madeAttempts = 5;
        expectedEntity.timestamp = DATE.unix();
        expect(repository.insert).toHaveBeenCalledTimes(1);
        expect(repository.insert).toHaveBeenCalledWith(expectedEntity);
    });

    it('should update the entity by id', () => {
        // GIVEN
        const shootAround: ShootAround = {
            totalAttempts: 10,
            madeAttempts: 5,
            spot: ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
            dateTime: DATE
        };

        // WHEN
        shootAroundService.update(1, shootAround);

        // THEN
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledWith(1, {
            totalAttempts: shootAround.totalAttempts,
            madeAttempts: shootAround.madeAttempts,
            spot: shootAround.spot.toString()
        });
    });

    it('should delete the entity by id', () => {
        // GIVEN

        // WHEN
        shootAroundService.delete(1);

        // THEN
        expect(repository.delete).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should find all ShootArounds ordered by timestamp DESC', async () => {
        // GIVEN

        // WHEN
        const result = await shootAroundService.findAll();

        // THEN
        expect(repository.find).toHaveBeenCalledTimes(1);
        expect(repository.find).toHaveBeenCalledWith({
            order: {
                timestamp: 'DESC'
            }
        });

        expect(result.length).toEqual(2);

        expect(result[0].id).toEqual(1);
        expect(result[0].totalAttempts).toEqual(20);
        expect(result[0].madeAttempts).toEqual(14);
        expect(result[0].spot).toEqual(ShootAroundSpot.FREE_THROW);

        expect(result[1].id).toEqual(2);
        expect(result[1].totalAttempts).toEqual(20);
        expect(result[1].madeAttempts).toEqual(8);
        expect(result[1].spot).toEqual(ShootAroundSpot.THREE_POINT_RIGHT_WING);
    });

    it('should find the ShootArounds between the given dates', async () => {
        // GIVEN

        // WHEN
        const result = await shootAroundService.findBetweenAndWithinSpots(DATE , DATE, [ShootAroundSpot.PAINT, ShootAroundSpot.FREE_THROW]);

        // THEN
        expect(repository.find).toHaveBeenCalledTimes(1);
        expect(repository.find).toHaveBeenCalledWith({
            where: {
                timestamp: Between(
                    DATE.clone().startOf('day').unix(),
                    DATE.clone().endOf('day').unix()
                ),
                spot: In(['PAINT', 'FREE_THROW'])
            }
        });

        expect(result.length).toEqual(2);

        expect(result[0].id).toEqual(1);
        expect(result[0].totalAttempts).toEqual(20);
        expect(result[0].madeAttempts).toEqual(14);
        expect(result[0].spot).toEqual(ShootAroundSpot.FREE_THROW);

        expect(result[1].id).toEqual(2);
        expect(result[1].totalAttempts).toEqual(20);
        expect(result[1].madeAttempts).toEqual(8);
        expect(result[1].spot).toEqual(ShootAroundSpot.THREE_POINT_RIGHT_WING);
    });
});