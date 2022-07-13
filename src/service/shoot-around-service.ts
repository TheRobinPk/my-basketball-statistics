import {ShootAround, ShootAroundEntity, ShootAroundSpot} from '../domain/shoot-around';
import moment from 'moment';
import {Repository} from 'typeorm/repository/Repository';

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

    findAll(): Promise<ShootAround[]> {
        return new Promise<ShootAround[]>((resolve) => {
            this.repository.find()
                .then((items) => {
                    resolve(items.map(this.mapToShootAround));
                });
        });
    }

    private mapToShootAround(entity: ShootAroundEntity): ShootAround {
        return {
            id: entity.id,
            dateTime: moment.unix(entity.timestamp),
            totalAttempts: entity.totalAttempts,
            madeAttempts: entity.madeAttempts,
            spot: entity.spot as ShootAroundSpot
        };
    }
}
