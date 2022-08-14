import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {DropDownItem} from '../common/dropdown/dropdown';
import DateRangePicker, {DateRange} from '../common/date-picker/date-range-picker';
import DropdownMultiSelect from '../common/dropdown/dropdown-multi-select';
import Switch, {ISwitchOption} from '../common/switch/switch';
import {ShootAroundSpot} from '../../domain/shoot-around';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import {DataAggregationType, setDashboardDataAggregationType, setDashboardDateRange, setDashboardShootAroundSpots} from '../../redux/reducers/dashboard/dashboard-reducer';
import colors from '../../colors';

const dataAggregationTypeItems: ISwitchOption[] = [
    {
        key: 'day',
        label: 'Day'
    },
    {
        key: 'week',
        label: 'Week'
    },
    {
        key: 'month',
        label: 'Month'
    }
];

const shootAroundSpotDropDownItems: DropDownItem[] = [
    {
        key: ShootAroundSpot.FREE_THROW.toString(),
        label: 'Free Throw',
    },
    {
        key: ShootAroundSpot.MID_RANGE_RIGHT_CORNER.toString(),
        label: 'Mid right corner',
    },
    {
        key: ShootAroundSpot.MID_RANGE_LEFT_CORNER.toString(),
        label: 'Mid left corner',
    },
    {
        key: ShootAroundSpot.MID_RANGE_LEFT_WING.toString(),
        label: 'Mid left wing',
    },
    {
        key: ShootAroundSpot.MID_RANGE_RIGHT_WING.toString(),
        label: 'Mid right wing',
    },
    {
        key: ShootAroundSpot.MID_RANGE_HIGH_POST.toString(),
        label: 'Mid high post',
    },
    {
        key: ShootAroundSpot.PAINT.toString(),
        label: 'Paint',
    },
    {
        key: ShootAroundSpot.THREE_POINT_RIGHT_CORNER.toString(),
        label: '3pt right corner',
    },
    {
        key: ShootAroundSpot.THREE_POINT_LEFT_CORNER.toString(),
        label: '3pt left corner',
    },
    {
        key: ShootAroundSpot.THREE_POINT_RIGHT_WING.toString(),
        label: '3pt right wing',
    },
    {
        key: ShootAroundSpot.THREE_POINT_LEFT_WING.toString(),
        label: '3pt left wing',
    },
    {
        key: ShootAroundSpot.THREE_POINT_TOP_OF_THE_KEY.toString(),
        label: '3pt top of the key',
    },
];

const DashboardHeader = () => {
    const dateRange = useAppSelector(state => state.dashboard.dateRange);
    const dataAggregationType = useAppSelector(state => state.dashboard.dataAggregationType);
    const shootAroundSpots = useAppSelector(state => state.dashboard.shootAroundSpots);

    const dispatch = useAppDispatch();

    const selectedDataAggregationType = dataAggregationTypeItems.find((item) => item.key === dataAggregationType);

    const selectedShootAroundSpotKeys = shootAroundSpots.map((spot) => spot.toString());
    const selectedShootAroundSpots = shootAroundSpotDropDownItems.filter((value) => selectedShootAroundSpotKeys.includes(value.key));

    const handleSelectedFilterSpotsChange = (selectedItems: DropDownItem[]) => {
        dispatch(setDashboardShootAroundSpots(selectedItems.map(item => item.key as ShootAroundSpot)));
    };

    const renderFilterSection = (children: React.ReactNode, title: string) => {
        return (
            <View style={styles.filterSectionStyle}>
                <View>
                    <Text style={styles.filterSectionTextStyle} variant='titleMedium'>{title}</Text>
                    {children}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.cardStyle}>
            <Card mode='elevated' elevation={5}>
                <Card.Content>
                    <DateRangePicker
                        value={dateRange}
                        onChange={(dateRange: DateRange) => dispatch(setDashboardDateRange(dateRange))} />
                    {renderFilterSection(
                        <Switch
                            options={dataAggregationTypeItems}
                            value={selectedDataAggregationType?.key || ''}
                            onPress={(value) => dispatch(setDashboardDataAggregationType(value as DataAggregationType))} />,
                        'Group data by'
                    )}
                    <DropdownMultiSelect
                        items={shootAroundSpotDropDownItems}
                        label='Shoot Around spots'
                        selectedItems={selectedShootAroundSpots}
                        onChange={(selectedItems: DropDownItem[]) => handleSelectedFilterSpotsChange(selectedItems)} />
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        margin: 8
    },
    filterSectionStyle: {
        marginVertical: 8,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    filterSectionTextStyle: {
        color: colors.darkerGrey,
        marginBottom: 4
    }
});

export default DashboardHeader;