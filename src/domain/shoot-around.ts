import {Moment} from 'moment';

export enum ShootAroundSpot {
    PAINT,
    FREE_THROW,
    MID_RANGE_LEFT_CORNER,
    MID_RANGE_RIGHT_CORNER,
    MID_RANGE_LEFT_WING,
    MID_RANGE_RIGHT_WING,
    MID_RANGE_HIGH_POST,
    THREE_POINT_LEFT_CORNER,
    THREE_POINT_RIGHT_CORNER,
    THREE_POINT_LEFT_WING,
    THREE_POINT_RIGHT_WING,
    THREE_POINT_TOP_OF_THE_KEY

}

export interface ShootAround {
    id?: number;
    dateTime: Moment;
    totalAttempts: number;
    madeAttempts: number;
    spot: ShootAroundSpot;
}