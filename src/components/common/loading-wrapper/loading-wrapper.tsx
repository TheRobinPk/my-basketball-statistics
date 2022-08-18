import React from 'react';
import colors from '../../../static/colors';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

interface IProps {
    isLoading: boolean;
    children: React.ReactNode;
}

const LoadingWrapper = (props: IProps) => {
    return (
        <>
            {props.isLoading ? (
                <View style={styles.container}>
                    <ActivityIndicator testID='activity-indicator' animating color={colors.primaryColor} />
                </View>
            ) : props.children}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default LoadingWrapper;