import React, {useCallback, useReducer} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ApplicationBar from '../../navigation/application-bar/application-bar';
import FloatingActionButton from '../../components/common/floating-action-button/floating-action-button';
import DashboardHeader from '../../components/dashboard/dashboard-header';
import DashboardChart from '../../components/dashboard/dashboard-chart';
import {ShootAroundStackNavigatorParamList} from '../../navigation/shoot-around-stack-navigator';
import {useComponentDidMount} from '../../hooks/useComponentDidMount';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import i18n from '../../i18n/i18n';
import {dashboardReducer, DataAggregationType, initialState, ShootAroundChartData} from '../../reducers/dashboard/dashboard-reducer';
import {useFocusEffect} from '@react-navigation/native';
import {DateRange} from '../../components/common/date-picker/date-range-picker';
import {ShootAroundSpot} from '../../domain/shoot-around';
import {useApplicationContext} from '../../context/application-context';

type IProps = NativeStackScreenProps<ShootAroundStackNavigatorParamList, 'DashboardScreen'>;

const DashboardScreen = (props: IProps) => {
    const [state, dispatch] = useReducer(dashboardReducer, initialState);
    const applicationContext = useApplicationContext();
    const { shootAroundService, shootAroundChartService } = applicationContext;
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

    useFocusEffect(
        useCallback(() => {
            getChartData(dateRange, dataAggregationType, shootAroundSpots);
        }, [dateRange, dataAggregationType, shootAroundSpots])
    );

    const getChartData = async (dateRange: DateRange, dataAggregationType: DataAggregationType, shootAroundSpots: ShootAroundSpot[]) => {
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
                    onDateRangeChanged={(dateRange) => dispatch({
                        type: 'setDateRange',
                        payload: dateRange
                    })}
                    onDataAggregationTypeChanged={(dataAggregationType) => dispatch({
                        type: 'setDataAggregationType',
                        payload: dataAggregationType
                    })}
                    onShootAroundSpotsChanged={(shootAroundSpots) => dispatch({
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