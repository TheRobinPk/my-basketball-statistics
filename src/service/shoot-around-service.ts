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

    findBetween(start: Moment, end: Moment): Promise<ShootAround[]> {
        const searchStart = start.clone().utc().startOf('day');
        const searchEnd = end.clone().utc().endOf('day');
        return new Promise<ShootAround[]>((resolve) => {
            this.repository.find({
                where: {
                    timestamp: Between(searchStart.unix(), searchEnd.unix())
                }
            })
                .then((entities) => {
                    const shootArounds = entities.map((entity) => {
                        return {
                            id: entity.id,
                            dateTime: moment.utc(entity.timestamp),
                            totalAttempts: entity.totalAttempts,
                            madeAttempts: entity.madeAttempts,
                            spot: entity.spot as ShootAroundSpot
                        };
                    });
                    resolve(shootArounds);
                });
        });
    }
}
