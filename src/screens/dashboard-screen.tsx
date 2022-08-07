import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FloatingActionButton from '../components/common/floating-action-button/floating-action-button';
import DashboardHeader from '../components/dashboard/dashboard-header';
import DashboardChart from '../components/dashboard/dashboard-chart';
import {RootStackParamList} from '../navigation/application-navigator';
import {useAppDispatch} from '../redux/store/store';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {setDashboardDataAggregationType, setDashboardDateRange} from '../redux/reducers/dashboard/dashboard-reducer';
import moment from 'moment';

type IProps = NativeStackScreenProps<RootStackParamList, 'DashboardScreen'>;

const DashboardScreen = (props: IProps) => {
    const dispatch = useAppDispatch();

    useComponentDidMount(() => {
        dispatch(setDashboardDateRange({
            start: moment().startOf('week'),
            end: moment().endOf('week')
        }));
        dispatch(setDashboardDataAggregationType('day'));
    });

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <View style={styles.cardStyle}>
                    <DashboardHeader />
                </View>
                <View style={styles.cardStyle}>
                    <DashboardChart />
                </View>
            </ScrollView>
            <FloatingActionButton
                icon='plus'
                openIcon='close'
                actions={[
                    {
                        title: 'Add Shoot Around',
                        icon: 'basketball-hoop',
                        pressHandler: () => props.navigation.navigate('AddShootAroundScreen')
                    }
                ]} />
        </>
    );
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        flexGrow: 1
    },
   cardStyle: {
        margin: 8
   }
});

export default DashboardScreen;