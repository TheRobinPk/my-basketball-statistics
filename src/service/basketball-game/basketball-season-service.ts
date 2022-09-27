import {BasketballSeason, BasketballSeasonEntity} from '../../domain/basketball-season';
import {Repository} from 'typeorm/repository/Repository';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';
import moment from 'moment/moment';
import {AbstractCrudService} from '../abstract-crud-service';

export default class BasketballSeasonService extends AbstractCrudService<BasketballSeasonEntity, BasketballSeason>{
    constructor(repository: Repository<BasketballSeasonEntity>) {
        super(repository);
    }

    protected getPartialEntity(basketballSeason: BasketballSeason): QueryDeepPartialEntity<BasketballSeasonEntity> {
        return {
            name: basketballSeason.name
        };
    }

    protected mapEntityToType(entity: BasketballSeasonEntity): BasketballSeason {
        return {
            id: entity.id,
            dateTime: moment.unix(entity.timestamp),
            name: entity.name
        };
    }

    protected mapTypeToEntity(basketballSeason: BasketballSeason): BasketballSeasonEntity {
        const entity = new BasketballSeasonEntity();
        entity.name = basketballSeason.name;
        entity.timestamp = basketballSeason.dateTime.unix();
        return entity;
    }
}
