import React from 'react';
import {Snackbar as SnackbarReactNativePaper} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';
import colors from '../../../colors';

interface IProps {
    label: string;
    testID: string;
    labelTestID: string;
    visible: boolean;
    duration?: number;
    onDismiss: () => void;
}

const Snackbar = (props: IProps) => {

    return (
        <SnackbarReactNativePaper
            testID={props.testID}
            visible={props.visible}
            duration={props.duration}
            style={styles.snackbarStyle}
            action={{
                label: 'Hide',
                labelStyle: styles.labelStyle,
                onPress: props.onDismiss
            }}
            onDismiss={props.onDismiss}>
            <Text
                testID={props.labelTestID}
                style={styles.labelStyle}>
                {props.label}
            </Text>
        </SnackbarReactNativePaper>
    );
};

const styles = StyleSheet.create({
    snackbarStyle: {
        backgroundColor: colors.primaryColor
    },
    labelStyle: {
        color: colors.accentColor
    }
});

export default Snackbar;