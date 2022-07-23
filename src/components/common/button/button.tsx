import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button as ButtonReactNativePaper} from 'react-native-paper';
import colors from '../../../colors';

interface IProps {
    label: string;
    testID: string;
    labelTestID: string;
    disabled?: boolean;
    loading?: boolean;
    onPress: () => void;
}

const Button = (props: IProps) => {
    const additionalButtonStyle = props.disabled || props.loading ? styles.disabledButtonStyle : styles.enabledButtonStyle;
    const buttonStyle = {
        ...styles.buttonStyle,
        ...additionalButtonStyle
    };
    const labelStyle = props.disabled || props.loading ? styles.disabledLabelStyle : styles.labelStyle;

    return (
        <ButtonReactNativePaper
            testID={props.testID}
            style={buttonStyle}
            disabled={props.disabled}
            loading={props.loading}
            onPress={props.onPress}>
            <Text style={labelStyle}>{props.loading ? '' : props.label}</Text>
        </ButtonReactNativePaper>
    );
};


const styles = StyleSheet.create({
    buttonStyle: {
        marginStart: 8,
        marginEnd: 8
    },
    enabledButtonStyle: {
        backgroundColor: colors.primaryColor
    },
    disabledButtonStyle: {
        backgroundColor: colors.disabledGrey
    },
    labelStyle: {
        color: colors.accentColor
    },
    disabledLabelStyle: {
        color: colors.grey
    }
});

export default Button;