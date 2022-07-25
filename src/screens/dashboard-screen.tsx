import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FloatingActionButton from '../components/common/floating-action-button/floating-action-button';
import DashboardHeader from '../components/dashboard/dashboard-header';
import {RootStackParamList} from '../navigation/application-navigator';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {setDashboardSelectedRange} from '../redux/reducers/dashboard/dashboard-reducer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import colors from '../colors';

type IProps = NativeStackScreenProps<RootStackParamList, 'DashboardScreen'>;

const DashboardScreen = (props: IProps) => {
    const aggregatedValues = useAppSelector(state => state.dashboard.aggregatedValues);

    const dispatch = useAppDispatch();

    useComponentDidMount(() => {
        dispatch(setDashboardSelectedRange({
            start: moment(),
            end: moment()
        }));
    });

    return (
        <View style={styles.container}>
            <DashboardHeader />
            <View>
                {aggregatedValues.map((aggregatedValue) => {
                    return (
                        <View key={aggregatedValue.spot.toString()}>
                            <Text>
                                {JSON.stringify(aggregatedValue)}
                            </Text>
                        </View>
                    );
                })}
            </View>
            <FloatingActionButton
                icon='plus'
                openIcon='close'
                actions={[
                    {
                        title: 'Add Shootaround',
                        icon: 'basketball-hoop',
                        pressHandler: () => props.navigation.navigate('AddShootAroundScreen')
                    }
                ]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        color: colors.white,
        height: '100%',
        padding: 8
    }
});

export default DashboardScreen;