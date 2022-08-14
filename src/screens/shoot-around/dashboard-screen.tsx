import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FloatingActionButton from '../../components/common/floating-action-button/floating-action-button';
import DashboardHeader from '../../components/dashboard/dashboard-header';
import DashboardChart from '../../components/dashboard/dashboard-chart';
import {ShootAroundStackNavigatorParamList} from '../../navigation/shoot-around-stack-navigator';
import {useAppDispatch} from '../../redux/store/store';
import {useComponentDidMount} from '../../hooks/useComponentDidMount';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {initDashboard} from '../../redux/reducers/dashboard/dashboard-reducer';
import moment from 'moment';
import ApplicationBar from '../../navigation/application-bar/application-bar';

type IProps = NativeStackScreenProps<ShootAroundStackNavigatorParamList, 'DashboardScreen'>;

const DashboardScreen = (props: IProps) => {
    const dispatch = useAppDispatch();

    useComponentDidMount(() => {
        dispatch(initDashboard({
            dataAggregationType: 'day',
            dateRange: {
                start: moment().startOf('day').subtract(7, 'day'),
                end: moment().startOf('day')
            }
        }));
    });

    return (
        <>
            <ApplicationBar title='Dashboard' showDrawerToggle />
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <DashboardHeader />
                <DashboardChart />
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
    }
});

export default DashboardScreen;