import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import colors from '../../static/colors';
import {ShootAroundSpot} from '../../domain/shoot-around';
import { Dimensions } from 'react-native';
import {Color} from 'react-native-svg/lib/typescript/lib/extract/types';

interface IProps {
    selectedSpot?: ShootAroundSpot;
    onSpotSelected: (selectedSpot: ShootAroundSpot) => void;
}

const BasketballCourt = (props: IProps) => {
    const { selectedSpot, onSpotSelected } = props;
    const windowWidth = Dimensions.get('window').width;

    const renderRect = (
        shootAroundSpot: ShootAroundSpot,
        x: number,
        y: number,
        height: number,
        width: number,
        fill: Color
    ) => {
      return (
          <Rect
              id={shootAroundSpot}
              x={x}
              y={y}
              height={height}
              width={width}
              stroke={colors.white}
              strokeWidth={0.5}
              opacity={selectedSpot !== shootAroundSpot ? 0.3 : 1}
              fill={fill}
              onPress={() => onSpotSelected(shootAroundSpot)} />
      );
    };

    const renderPath = (shootAroundSpot: ShootAroundSpot, d: string, fill: Color) => {
        return (
            <Path
                id={shootAroundSpot}
                d={d}
                stroke={colors.white}
                strokeWidth={0.5}
                opacity={selectedSpot !== shootAroundSpot ? 0.3 : 1}
                fill={fill}
                onPress={() => onSpotSelected(shootAroundSpot)} />
        );
    };

    return (
        <Svg viewBox='0 0 150 110' width={windowWidth} height={windowWidth * 0.733} >
            {renderRect(ShootAroundSpot.THREE_POINT_LEFT_CORNER, 0, 0, 42, 9, colors.basketballCourt)}
            {renderPath(ShootAroundSpot.THREE_POINT_LEFT_WING, 'M0 42 V110 H37 L45 90 Q20,80 9 42 L0 42', colors.basketballCourt)}
            {renderPath(ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY, 'M45 90 L37 110 H113 L105 90 Q75,101 45 90', colors.basketballCourt)}
            {renderPath(ShootAroundSpot.THREE_POINT_RIGHT_WING, 'M150 42 V110 H113 L105 90 Q130,80 141 42', colors.basketballCourt)}
            {renderRect(ShootAroundSpot.THREE_POINT_RIGHT_CORNER, 141, 0, 42, 9, colors.basketballCourt)}
            {renderRect(ShootAroundSpot.MID_RANGE_LEFT_CORNER, 9, 0, 21, 41.5, colors.basketballCourt)}
            {renderPath(ShootAroundSpot.MID_RANGE_LEFT_WING, 'M9 42 V21 H50.5 V58 H57 L45 90 Q20,80 9 42', colors.basketballCourt)}
            {renderPath(ShootAroundSpot.MID_RANGE_HIGH_POST, 'M45 90 L57 58 A18 18 0 0 0 93 58 L105 90 Q75,101 45 90', colors.basketballCourt)}
            {renderPath(ShootAroundSpot.MID_RANGE_RIGHT_WING, 'M141 42 V21 H99.5 V58 H93 L105 90 Q130,80 141 42', colors.basketballCourt)}
            {renderRect(ShootAroundSpot.MID_RANGE_RIGHT_CORNER, 99.5, 0, 21, 41.5, colors.basketballCourt)}
            {renderRect(ShootAroundSpot.PAINT, 50.5, 0, 58, 49, colors.basketballCourtPaint)}
            {renderPath(ShootAroundSpot.FREE_THROW, 'M93 58 H57 A18 18 0 0 0 93 58', colors.basketballCourtPaint)}
        </Svg>
    );
};

export default BasketballCourt;