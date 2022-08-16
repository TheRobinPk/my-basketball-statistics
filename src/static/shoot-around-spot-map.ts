import {ShootAroundSpot} from '../domain/shoot-around';
import i18n from '../i18n/i18n';

export interface ShootAroundSpotConfig {
    spot: ShootAroundSpot;
    translation: string;
    color: string;
}

const ShootAroundSpotMap: Map<ShootAroundSpot, ShootAroundSpotConfig> = new Map<ShootAroundSpot, ShootAroundSpotConfig>([
    [
        ShootAroundSpot.PAINT,
        {
            spot: ShootAroundSpot.PAINT,
            translation: i18n.t('general.shootAroundSpotLabels.paint'),
            color: '#000000'
        }
    ],
    [
        ShootAroundSpot.FREE_THROW,
        {
            spot: ShootAroundSpot.FREE_THROW,
            translation: i18n.t('general.shootAroundSpotLabels.freeThrow'),
            color: '#8b4513'
        }
    ],
    [
        ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
        {
            spot: ShootAroundSpot.MID_RANGE_RIGHT_CORNER,
            translation: i18n.t('general.shootAroundSpotLabels.midRightCorner'),
            color: '#008000'
        }
    ],
    [
        ShootAroundSpot.MID_RANGE_LEFT_CORNER,
        {
            spot: ShootAroundSpot.MID_RANGE_LEFT_CORNER,
            translation: i18n.t('general.shootAroundSpotLabels.midLeftCorner'),
            color: '#4682b4'
        }
    ],
    [
        ShootAroundSpot.MID_RANGE_RIGHT_WING,
        {
            spot: ShootAroundSpot.MID_RANGE_RIGHT_WING,
            translation: i18n.t('general.shootAroundSpotLabels.midRightWing'),
            color: '#4b0082'
        }
    ],
    [
        ShootAroundSpot.MID_RANGE_LEFT_WING,
        {
            spot: ShootAroundSpot.MID_RANGE_LEFT_WING,
            translation: i18n.t('general.shootAroundSpotLabels.midLeftWing'),
            color: '#ff0000'
        }
    ],
    [
        ShootAroundSpot.MID_RANGE_HIGH_POST,
        {
            spot: ShootAroundSpot.MID_RANGE_HIGH_POST,
            translation: i18n.t('general.shootAroundSpotLabels.midHighPost'),
            color: '#00ff00'
        }
    ],
    [
        ShootAroundSpot.THREE_POINT_RIGHT_CORNER,
        {
            spot: ShootAroundSpot.THREE_POINT_RIGHT_CORNER,
            translation: i18n.t('general.shootAroundSpotLabels.threeRightCorner'),
            color: '#00ffff'
        }
    ],
    [
        ShootAroundSpot.THREE_POINT_LEFT_CORNER,
        {
            spot: ShootAroundSpot.THREE_POINT_LEFT_CORNER,
            translation: i18n.t('general.shootAroundSpotLabels.threeLeftCorner'),
            color: '#0000ff'
        }
    ],
    [
        ShootAroundSpot.THREE_POINT_RIGHT_WING,
        {
            spot: ShootAroundSpot.THREE_POINT_RIGHT_WING,
            translation: i18n.t('general.shootAroundSpotLabels.threeRightWing'),
            color: '#ffff00'
        }
    ],
    [
        ShootAroundSpot.THREE_POINT_LEFT_WING,
        {
            spot: ShootAroundSpot.THREE_POINT_LEFT_WING,
            translation: i18n.t('general.shootAroundSpotLabels.threeLeftWing'),
            color: '#ff1493'
        }
    ],
    [
        ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY,
        {
            spot: ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY,
            translation: i18n.t('general.shootAroundSpotLabels.threeTopOfTheKey'),
            color: '#ff00ff'
        }
    ],

]);

export default ShootAroundSpotMap;