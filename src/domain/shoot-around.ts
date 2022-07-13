import {Moment} from 'moment';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

export enum ShootAroundSpot {
    PAINT = 'PAINT',
    FREE_THROW = 'FREE_THROW',
    MID_RANGE_LEFT_CORNER = 'MID_RANGE_LEFT_CORNER',
    MID_RANGE_RIGHT_CORNER = 'MID_RANGE_RIGHT_CORNER',
    MID_RANGE_LEFT_WING = 'MID_RANGE_LEFT_WING',
    MID_RANGE_RIGHT_WING = 'MID_RANGE_RIGHT_WING',
    MID_RANGE_HIGH_POST = 'MID_RANGE_HIGH_POST',
    THREE_POINT_LEFT_CORNER = 'THREE_POINT_LEFT_CORNER',
    THREE_POINT_RIGHT_CORNER = 'THREE_POINT_RIGHT_CORNER',
    THREE_POINT_LEFT_WING = 'THREE_POINT_LEFT_WING',
    THREE_POINT_RIGHT_WING = 'THREE_POINT_RIGHT_WING',
    THREE_POINT_TOP_OF_THE_KEY = 'THREE_POINT_TOP_OF_THE_KEY'
}

@Entity('shoot_around')
export class ShootAroundEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, name: 'timestamp' })
    timestamp!: number;

    @Column({ nullable: false, name: 'total_attempts' })
    totalAttempts!: number;

    @Column({ nullable: false, name: 'made_attempts' })
    madeAttempts!: number;

    @Column({ nullable: false, name: 'spot' })
    spot!: string;
}

export interface ShootAround {
    id?: number;
    dateTime: Moment;
    totalAttempts: number;
    madeAttempts: number;
    spot: ShootAroundSpot;
}
