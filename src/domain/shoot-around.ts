import {Moment} from 'moment';

export const PAINT = 'PAINT';
export const FREE_THROW = 'FREE_THROW';
export const MID_RANGE_LEFT_CORNER = 'MID_RANGE_LEFT_CORNER';
export const MID_RANGE_RIGHT_CORNER = 'MID_RANGE_RIGHT_CORNER';
export const MID_RANGE_LEFT_WING = 'MID_RANGE_LEFT_WING';
export const MID_RANGE_RIGHT_WING = 'MID_RANGE_RIGHT_WING';
export const MID_RANGE_HIGH_POST = 'MID_RANGE_HIGH_POST';
export const THREE_POINT_LEFT_CORNER = 'THREE_POINT_LEFT_CORNER';
export const THREE_POINT_RIGHT_CORNER = 'THREE_POINT_RIGHT_CORNER';
export const THREE_POINT_LEFT_WING = 'THREE_POINT_LEFT_WING';
export const THREE_POINT_RIGHT_WING = 'THREE_POINT_RIGHT_WING';
export const THREE_POINT_TOP_OF_THE_KEY = 'THREE_POINT_TOP_OF_THE_KEY';

export interface ShootAround {
    id?: number;
    dateTime: Moment;
    totalAttempts: number;
    madeAttempts: number;
    spot: string;
}