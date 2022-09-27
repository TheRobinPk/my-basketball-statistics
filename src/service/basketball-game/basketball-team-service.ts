import {BasketballTeam, BasketballTeamEntity} from '../../domain/basketball-team';
import {Repository} from 'typeorm/repository/Repository';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';
import moment from 'moment/moment';
import {AbstractCrudService} from '../abstract-crud-service';
import {BasketballSeasonEntity} from '../../domain/basketball-season';

export default class BasketballTeamService extends AbstractCrudService<BasketballTeamEntity, BasketballTeam>{
    constructor(repository: Repository<BasketballTeamEntity>) {
        super(repository);
    }

    protected getPartialEntity(basketballTeam: BasketballTeam): QueryDeepPartialEntity<BasketballTeamEntity> {
        return {
            name: basketballTeam.name
        };
    }

    protected mapEntityToType(entity: BasketballTeamEntity): BasketballTeam {
        return {
            id: entity.id,
            dateTime: moment.unix(entity.timestamp),
            name: entity.name
        };
    }

    protected mapTypeToEntity(basketballTeam: BasketballTeam): BasketballTeamEntity {
        const entity = new BasketballSeasonEntity();
        entity.name = basketballTeam.name;
        entity.timestamp = basketballTeam.dateTime.unix();
        return entity;
    }
}
