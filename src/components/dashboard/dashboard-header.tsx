import React from 'react';
import {Card} from 'react-native-paper';
import {DataAggregationType, setDashboardDataAggregationType, setDashboardDateRange, setDashboardShootAroundSpots} from '../../redux/reducers/dashboard/dashboard-reducer';
import {ShootAroundSpot} from '../../domain/shoot-around';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import Dropdown, {DropDownItem} from '../common/dropdown/dropdown';
import DateRangePicker, {DateRange} from '../common/date-picker/date-range-picker';
import DropdownMultiSelect from '../common/dropdown/dropdown-multi-select';

const DashboardHeader = () => {
    const dateRange = useAppSelector(state => state.dashboard.dateRange);
    const dataAggregationType = useAppSelector(state => state.dashboard.dataAggregationType);
    const shootAroundSpots = useAppSelector(state => state.dashboard.shootAroundSpots);

    const dispatch = useAppDispatch();

    const dataAggregationTypeDropDownItems: DropDownItem[] = [
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

    const selectedDataAggregationType = dataAggregationTypeDropDownItems.find((value) => value.key === dataAggregationType);

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

    const selectedShootAroundSpotKeys = shootAroundSpots.map((spot) => spot.toString());
    const selectedShootAroundSpots = shootAroundSpotDropDownItems.filter((value) => selectedShootAroundSpotKeys.includes(value.key));

    const handleSelectedFilterSpotsChange = (selectedItems: DropDownItem[]) => {
        dispatch(setDashboardShootAroundSpots(selectedItems.map(item => item.key as ShootAroundSpot)));
    };

    return (
        <Card mode='elevated' elevation={5}>
            <Card.Content>
                <DateRangePicker
                    value={dateRange}
                    onChange={(dateRange: DateRange) => dispatch(setDashboardDateRange(dateRange))} />
                <Dropdown
                    items={dataAggregationTypeDropDownItems}
                    label='Aggregate results by'
                    selectedItem={selectedDataAggregationType}
                    onChange={(selectedItem: DropDownItem) => dispatch(setDashboardDataAggregationType(selectedItem.key as DataAggregationType))} />
                <DropdownMultiSelect
                    items={shootAroundSpotDropDownItems}
                    label='Shootaround spots'
                    selectedItems={selectedShootAroundSpots}
                    onChange={(selectedItems: DropDownItem[]) => handleSelectedFilterSpotsChange(selectedItems)} />
            </Card.Content>
        </Card>
    );
};

export default DashboardHeader;