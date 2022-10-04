import {ShootAround, ShootAroundEntity, ShootAroundSpot} from '../../domain/shoot-around';
import {Repository} from 'typeorm/repository/Repository';
import moment, {Moment} from 'moment';
import {Between, In} from 'typeorm';
import {AbstractCrudService} from '../abstract-crud-service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export default class ShootAroundService extends AbstractCrudService<ShootAroundEntity, ShootAround> {
    constructor(repository: Repository<ShootAroundEntity>) {
        super(repository);
    }

    protected mapTypeToEntity(shootAround: ShootAround): ShootAroundEntity {
        const entity = new ShootAroundEntity();
        entity.spot = shootAround.spot.toString();
        entity.madeAttempts = shootAround.madeAttempts;
        entity.totalAttempts = shootAround.totalAttempts;
        entity.timestamp = shootAround.dateTime.unix();
        return entity;
    }
    protected mapEntityToType(entity: ShootAroundEntity): ShootAround {
        return {
            id: entity.id,
            dateTime: moment.unix(entity.timestamp),
            totalAttempts: entity.totalAttempts,
            madeAttempts: entity.madeAttempts,
            spot: entity.spot as ShootAroundSpot
        };
    }
    protected getPartialEntity(shootAround: ShootAround): QueryDeepPartialEntity<ShootAroundEntity> {
        return {
            totalAttempts: shootAround.totalAttempts,
            madeAttempts: shootAround.madeAttempts,
            spot: shootAround.spot.toString()
        };
    }

    async findBetweenAndWithinSpots(start: Moment, end: Moment, spots: ShootAroundSpot[]): Promise<ShootAround[]> {
        const searchStart = start.clone().startOf('day');
        const searchEnd = end.clone().endOf('day');
        const entities = await this.repository.find({
            where: {
                timestamp: Between(searchStart.unix(), searchEnd.unix()),
                spot: In([...spots.map((spot) => spot.toString())])
            },
        });
        return entities.map(this.mapEntityToType);
    }
}
