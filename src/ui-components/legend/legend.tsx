import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export interface ILegendValue {
    label: string;
    color: string;
}

interface IProps {
    values: ILegendValue[];
}

const Legend = (props: IProps) => {
    const { values } = props;

    const legendColorIndicatorStyle = (color: string) => {
        return {
            ...styles.legendColorIndicatorStyle,
            backgroundColor: color
        };
    };

    return (
        <View style={styles.legendItemsContainer}>
            {values.map((value) => {
                return (
                    <View key={value.label} style={styles.legendItemStyle}>
                        <View style={legendColorIndicatorStyle(value.color)} />
                        <Text>{value.label}</Text>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    legendItemsContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    legendItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16
    },
    legendColorIndicatorStyle: {
        width: 12,
        height: 12,
        borderRadius: 8,
        marginRight: 4
    }
});

export default Legend;