import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FloatingActionButton from '../components/common/floating-action-button/floating-action-button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/application-navigator';
import colors from '../colors';

type IProps = NativeStackScreenProps<RootStackParamList, 'DashboardScreen'>;

const DashboardScreen = (props: IProps) => {
    return (
        <View style={styles.container}>
            <Text>
                DashboardScreen
            </Text>
            <FloatingActionButton
                color={colors.primaryColor}
                icon={{ name: 'add', color: colors.white }}
                openIcon={{ name: 'close', color: colors.white }}
                actions={[
                    {
                        title: 'Add Shootaround',
                        icon: { name: 'add', color: colors.white },
                        color: colors.primaryColor,
                        pressHandler: () => props.navigation.navigate('AddShootAroundScreen')
                    }
                ]} />
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