import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Moment} from 'moment/moment';

export interface BasketballSeason {
    id?: number;
    dateTime: Moment;
    name: string;
}

@Entity('basketball_season')
export class BasketballSeasonEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, name: 'timestamp' })
    timestamp!: number;

    @Column({ nullable: false, name: 'name' })
    name!: string;
}
