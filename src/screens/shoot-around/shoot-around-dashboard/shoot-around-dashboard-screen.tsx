import React, {useCallback, useReducer} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ApplicationBar from '../../../navigation/application-bar/application-bar';
import FloatingActionButton from '../../../ui-components/floating-action-button/floating-action-button';
import ShootAroundDashboardHeader from './components/shoot-around-dashboard-header';
import ShootAroundDashboardChart from './components/shoot-around-dashboard-chart';
import {ShootAroundStackNavigatorParamList} from '../../../navigation/shoot-around-stack-navigator';
import {useComponentDidMount} from '../../../hooks/use-component-did-mount';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import i18n from '../../../i18n/i18n';
import {shootAroundDashboardReducer, ShootAroundDataAggregationType, initialState, ShootAroundChartData} from '../../../reducers/shoot-around/shoot-around-dashboard-reducer';
import {useFocusEffect} from '@react-navigation/native';
import {DateRange} from '../../../ui-components/date-picker/date-range-picker';
import {ShootAroundSpot} from '../../../domain/shoot-around';
import {useApplicationContext} from '../../../context/application-context';

type IProps = NativeStackScreenProps<ShootAroundStackNavigatorParamList, 'ShootAroundDashboardScreen'>;

const ShootAroundDashboardScreen = (props: IProps) => {
    const [state, dispatch] = useReducer(shootAroundDashboardReducer, initialState);
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

    const getChartData = async (dateRange: DateRange, dataAggregationType: ShootAroundDataAggregationType, shootAroundSpots: ShootAroundSpot[]) => {
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
                <ShootAroundDashboardHeader
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
                <ShootAroundDashboardChart chartData={chartData} />
            </ScrollView>
            <FloatingActionButton
                icon='plus'
                openIcon='close'
                actions={[
                    {
                        title: i18n.t('screens.dashboard.addShootAround'),
                        icon: 'basketball-hoop',
                        testID: 'add-shoot-around-option',
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

export default ShootAroundDashboardScreen;