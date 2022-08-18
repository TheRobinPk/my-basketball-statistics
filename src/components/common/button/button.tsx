import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as ButtonReactNativePaper, Text} from 'react-native-paper';
import colors from '../../../static/colors';

type ButtonType = 'default' | 'primary';

interface IProps {
    label: string;
    type: ButtonType;
    testID: string;
    labelTestID: string;
    disabled?: boolean;
    loading?: boolean;
    onPress: () => void;
}

const Button = (props: IProps) => {
    let additionalButtonStyle = null;
    let additionalLabelStyle = null;
    if (props.disabled || props.loading) {
        additionalButtonStyle = styles.disabledButtonStyle;
        additionalLabelStyle = styles.disabledLabelStyle;
    } else if (props.type === 'primary') {
        additionalButtonStyle = styles.primaryButtonStyle;
        additionalLabelStyle = styles.primaryLabelStyle;
    }
    const buttonStyle = {
        ...styles.buttonStyle,
        ...additionalButtonStyle
    };

    const labelStyle = {
        ...styles.labelStyle,
        ...additionalLabelStyle
    };

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
        marginEnd: 8,
        borderColor: colors.primaryColor,
        borderWidth: 1,
    },
    primaryButtonStyle: {
        backgroundColor: colors.primaryColor,
        borderWidth: 0,
    },
    disabledButtonStyle: {
        backgroundColor: colors.lightGrey,
        borderWidth: 0
    },
    labelStyle: {
        color: colors.primaryColor
    },
    primaryLabelStyle: {
        color: colors.white
    },
    disabledLabelStyle: {
        color: colors.inactiveGrey
    }
});

export default Button;