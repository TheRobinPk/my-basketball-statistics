import {ShootAround, ShootAroundEntity, ShootAroundSpot} from '../domain/shoot-around';
import {Repository} from 'typeorm/repository/Repository';
import moment, {Moment} from 'moment';
import {Between} from 'typeorm';
import {ShootAroundAggregatedResult} from '../redux/reducers/dashboard/dashboard-reducer';

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

    async findAggregatedBy(start: Moment, end: Moment, spots: ShootAroundSpot[]): Promise<ShootAroundAggregatedResult[]> {
        const searchStart = start.clone().startOf('day');
        const searchEnd = end.clone().endOf('day');
        const queryString = this.getAggregatedQuery(searchStart, searchEnd, spots);
        const queryResult = await this.repository.query(queryString);
        return queryResult.map(this.mapAggregatedResult);
    }

    private mapAggregatedResult(row: any): ShootAroundAggregatedResult {
        return {
            day: moment.unix(row['timestamp'] as number),
            spot: row['spot'] as ShootAroundSpot,
            totalAttempts: row['total_attempts'] as number,
            madeAttempts: row['made_attempts'] as number,
        };
    }

    private getAggregatedQuery(searchStart: moment.Moment, searchEnd: moment.Moment, spots: ShootAroundSpot[]) {
        return `select
            a.spot,
            strftime('%s', a.day) as timestamp,
            sum(a.total_attempts) as total_attempts,
            sum(a.made_attempts) as made_attempts
        from 
            (
                select
                    s.spot,
                    DATE(s.timestamp, 'unixepoch') as day,
                    s.total_attempts,
                    s.made_attempts
                from shoot_around s
                where
                    s.timestamp between ${searchStart.unix()} and ${searchEnd.unix()}
                    and s.spot in (${spots.map((spot) => `'${spot.toString()}'`).join(',')})
            ) a
        group by a.spot, a.day`;
    }
}
