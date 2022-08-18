import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {ToggleButton, Text} from 'react-native-paper';
import colors from '../../../static/colors';

export interface ISwitchOption {
    key: string;
    label: string;
    testID: string;
}

interface IProps {
    options: ISwitchOption[];
    value: string;
    onPress: (value: string) => void;
}

const Switch = (props: IProps) => {
    const { options, value, onPress } = props;

    const getToggleButtonStyle = (option: ISwitchOption): ViewStyle => {
        const isActive = value === option.key;
        const additionalStyle = isActive ?
            { backgroundColor: colors.primaryColor } :
            { backgroundColor: colors.white };
        return {
            ...styles.defaultToggleButtonStyle,
            ...additionalStyle
        };
    };

    const getToggleButtonTextStyle = (option: ISwitchOption): TextStyle => {
        const isActive = value === option.key;
        return {
            color: isActive ? colors.white : colors.black
        };
    };

    return (
        <ToggleButton.Row
            onValueChange={(value) => onPress(value)} value={value}>
            {options.map((option) => (
                <ToggleButton
                    key={option.key}
                    style={getToggleButtonStyle(option)}
                    icon={() => (
                        <View style={styles.optionStyle}>
                            <Text
                                style={getToggleButtonTextStyle(option)}
                                testID={option.testID}>
                                {option.label}
                            </Text>
                        </View>
                    )}
                    value={option.key} />
            ))}
        </ToggleButton.Row>
    );
};

const styles = StyleSheet.create({
    defaultToggleButtonStyle: {
        width: 100,
    },
    optionStyle: {
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});

export default Switch;