import {ShootAround, ShootAroundEntity} from '../domain/shoot-around';
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
}
