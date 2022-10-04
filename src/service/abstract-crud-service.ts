import {Repository} from 'typeorm/repository/Repository';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractCrudService<E, T> {
    protected repository: Repository<E>;

    protected constructor(repository: Repository<E>) {
        this.repository = repository;
    }

    insert(type: T) {
        return new Promise<void>((resolve) => {
            const entity = this.mapTypeToEntity(type);
            this.repository.insert(entity)
                .then(() => {
                    resolve();
                });
        });
    }

    update(id: number, type: T): Promise<void> {
        return new Promise<void>((resolve) => {
            this.repository.update(id, this.getPartialEntity(type))
                .then(() => {
                    resolve();
                });
        });
    }

    delete(id: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.repository.delete(id)
                .then(() => {
                    resolve();
                });
        });
    }

    async findEntityById(id: number): Promise<E | undefined> {
        const entity = await this.repository.findOne({
            where: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                id: id
            }
        });
        return entity || undefined;
    }

    async findAll(): Promise<T[]> {
        const entities = await this.repository.find({
            order: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                timestamp: 'DESC'
            }
        });
        return entities.map(this.mapEntityToType);
    }

    protected abstract mapTypeToEntity(type: T): E;

    protected abstract mapEntityToType(entity: E): T;

    protected abstract getPartialEntity(type: T): QueryDeepPartialEntity<E>;
}
