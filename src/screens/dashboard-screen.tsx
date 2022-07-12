import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../colors';

const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
                DashboardScreen
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        color: colors.white,
        height: '100%',
        padding: 8
    }
});

export default DashboardScreen;