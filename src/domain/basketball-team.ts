import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Moment} from 'moment/moment';

export interface BasketballTeam {
    id?: number;
    dateTime: Moment;
    name: string;
}

@Entity('basketball_team')
export class BasketballTeamEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, name: 'timestamp' })
    timestamp!: number;

    @Column({ nullable: false, name: 'name' })
    name!: string;
}