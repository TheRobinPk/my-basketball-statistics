import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import colors from '../../colors';
import {ShootAroundSpot} from '../../domain/shoot-around';
import { Dimensions } from 'react-native';

interface IProps {
    selectedSpot?: ShootAroundSpot;
    onSpotSelected: (selectedSpot: ShootAroundSpot) => void;
}

const BasketballCourt = (props: IProps) => {
    const { selectedSpot, onSpotSelected } = props;
    const windowWidth = Dimensions.get('window').width;

    const renderRect = (shootAroundSpot: ShootAroundSpot, x: number, y: number, height: number, width: number) => {
      return (
          <Rect
              id={shootAroundSpot}
              x={x}
              y={y}
              height={height}
              width={width}
              stroke={colors.black}
              strokeWidth={0.5}
              fill={selectedSpot === shootAroundSpot ? colors.grey : undefined}
              onPress={() => onSpotSelected(shootAroundSpot)} />
      );
    };

    const renderPath = (shootAroundSpot: ShootAroundSpot, d: string) => {
        return (
            <Path
                id={shootAroundSpot}
                d={d}
                stroke={colors.black}
                strokeWidth={0.5}
                fill={selectedSpot === shootAroundSpot ? colors.grey : undefined}
                onPress={() => onSpotSelected(shootAroundSpot)} />
        );
    };

    return (
        <Svg viewBox='0 0 150 110' width={windowWidth} height={windowWidth * 0.733} >
            {renderRect(ShootAroundSpot.THREE_POINT_LEFT_CORNER, 0, 0, 42, 9)}
            {renderPath(ShootAroundSpot.THREE_POINT_LEFT_WING, 'M0 42 V110 H37 L45 90 Q20,80 9 42 L0 42')}
            {renderPath(ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY, 'M45 90 L37 110 H113 L105 90 Q75,101 45 90')}
            {renderPath(ShootAroundSpot.THREE_POINT_RIGHT_WING, 'M150 42 V110 H113 L105 90 Q130,80 141 42')}
            {renderRect(ShootAroundSpot.THREE_POINT_RIGHT_CORNER, 141, 0, 42, 9)}
            {renderRect(ShootAroundSpot.MID_RANGE_LEFT_CORNER, 9, 0, 21, 41.5)}
            {renderPath(ShootAroundSpot.MID_RANGE_LEFT_WING, 'M9 42 V21 H50.5 V58 H57 L45 90 Q20,80 9 42')}
            {renderPath(ShootAroundSpot.MID_RANGE_HIGH_POST, 'M45 90 L57 58 A18 18 0 0 0 93 58 L105 90 Q75,101 45 90')}
            {renderPath(ShootAroundSpot.MID_RANGE_RIGHT_WING, 'M141 42 V21 H99.5 V58 H93 L105 90 Q130,80 141 42')}
            {renderRect(ShootAroundSpot.MID_RANGE_RIGHT_CORNER, 99.5, 0, 21, 41.5)}
            {renderRect(ShootAroundSpot.PAINT, 50.5, 0, 58, 49)}
            {renderPath(ShootAroundSpot.FREE_THROW, 'M93 58 H57 A18 18 0 0 0 93 58')}
        </Svg>
    );
};

export default BasketballCourt;