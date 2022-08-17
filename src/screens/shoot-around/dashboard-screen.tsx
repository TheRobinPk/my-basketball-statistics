import React, {useCallback, useEffect, useReducer} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ApplicationBar from '../../navigation/application-bar/application-bar';
import FloatingActionButton from '../../components/common/floating-action-button/floating-action-button';
import DashboardHeader from '../../components/dashboard/dashboard-header';
import DashboardChart from '../../components/dashboard/dashboard-chart';
import {ShootAroundStackNavigatorParamList} from '../../navigation/shoot-around-stack-navigator';
import {useAppSelector} from '../../redux/store/store';
import {useComponentDidMount} from '../../hooks/useComponentDidMount';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import i18n from '../../i18n/i18n';
import {dashboardReducer, initialState, ShootAroundChartData} from '../../reducers/dashboard/dashboard-reducer';

type IProps = NativeStackScreenProps<ShootAroundStackNavigatorParamList, 'DashboardScreen'>;

const DashboardScreen = (props: IProps) => {
    const [state, dispatch] = useReducer(dashboardReducer, initialState);
    const shootAroundService = useAppSelector(state => state.application.shootAroundService);
    const shootAroundChartService = useAppSelector(state => state.application.shootAroundChartService);
    const { dateRange, dataAggregationType, shootAroundSpots, chartData } = state;

    useComponentDidMount(() => {
        dispatch({
            type: 'init',
            payload: {
                dataAggregationType: 'day',
                dateRange: {
                    start: moment().startOf('day').subtract(7, 'day'),
                    end: moment().startOf('day')
                }
            }
        });
    });

    useEffect(() => {
        getChartData();
    }, [dateRange, dataAggregationType, shootAroundSpots]);

    const getChartData = async () => {
        const shootArounds = await shootAroundService?.findBetweenAndWithinSpots(dateRange.start, dateRange.end, shootAroundSpots);
        const chartData: ShootAroundChartData | undefined = shootAroundChartService?.calculateShootAroundChartData(shootArounds || [], dataAggregationType, dateRange);

        if (chartData && chartData.dataSets.length > 0) {
            dispatch({
                type: 'setChartData',
                payload: chartData
            });
        }
    };

    return (
        <>
            <ApplicationBar title={i18n.t('general.dashboard')} showDrawerToggle />
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <DashboardHeader
                    dateRange={dateRange}
                    dataAggregationType={dataAggregationType}
                    shootAroundSpots={shootAroundSpots}
                    setDashboardDateRange={(dateRange) => dispatch({
                        type: 'setDateRange',
                        payload: dateRange
                    })}
                    setDashboardDataAggregationType={(dataAggregationType) => dispatch({
                        type: 'setDataAggregationType',
                        payload: dataAggregationType
                    })}
                    setDashboardShootAroundSpots={(shootAroundSpots) => dispatch({
                        type: 'setShootAroundSpots',
                        payload: shootAroundSpots
                    })} />
                <DashboardChart chartData={chartData} />
            </ScrollView>
            <FloatingActionButton
                icon='plus'
                openIcon='close'
                actions={[
                    {
                        title: i18n.t('screens.dashboard.addShootAround'),
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