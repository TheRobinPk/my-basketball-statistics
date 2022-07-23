import {ShootAround, ShootAroundEntity, ShootAroundSpot} from '../domain/shoot-around';
import {Repository} from 'typeorm/repository/Repository';
import moment, {Moment} from 'moment';
import {Between} from 'typeorm';

export default class ShootAroundService {
    private repository: Repository<ShootAroundEntity>;

    constructor(repository: Repository<ShootAroundEntity>) {
        this.repository = repository;
    }

    insert(shootAround: ShootAround) {
        return new Promise<void>((resolve) => {
            const entity = new ShootAroundEntity();
            entity.spot = shootAround.spot.toString();
            entity.madeAttempts = shootAround.madeAttempts;
            entity.totalAttempts = shootAround.totalAttempts;
            entity.timestamp = shootAround.dateTime.unix();
            this.repository.insert(entity)
                .then(() => {
                    resolve();
                });
        });
    }

    async findBetween(start: Moment, end: Moment): Promise<ShootAround[]> {
        const searchStart = start.clone().startOf('day');
        const searchEnd = end.clone().endOf('day');
        const entities = await this.repository.find({
            where: {
                timestamp: Between(searchStart.unix(), searchEnd.unix())
            }
        });
        return entities.map((entity) => {
            return {
                id: entity.id,
                dateTime: moment.unix(entity.timestamp),
                totalAttempts: entity.totalAttempts,
                madeAttempts: entity.madeAttempts,
                spot: entity.spot as ShootAroundSpot
            };
        });
    }
}
