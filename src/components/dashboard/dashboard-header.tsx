import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
import DateRangePicker, {DateRange} from '../common/date-time-range-picker/date-range-picker';
import MultiItemPicker, {DropDownItem} from '../common/multi-item-picker/multi-item-picker';
import {setDashboardSelectedFilterSpots, setDashboardSelectedRange} from '../../redux/reducers/dashboard/dashboard-reducer';
import {ShootAroundSpot} from '../../domain/shoot-around';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';

const DashboardHeader = () => {
    const selectedRange = useAppSelector(state => state.dashboard.selectedRange);
    const selectedFilterSpots = useAppSelector(state => state.dashboard.selectedFilterSpots);

    const dispatch = useAppDispatch();

    const dropDownValues: DropDownItem[] = [
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
    const selectedItems = dropDownValues
        .filter((value) => selectedFilterSpots
            .map((spot) => spot.toString())
            .includes(value.key));

    const handleMultiItemPickerChange = (selectedItems: DropDownItem[]) => {
        dispatch(setDashboardSelectedFilterSpots(selectedItems.map(item => item.key as ShootAroundSpot)));
    };

    return (
        <Card mode='elevated' elevation={5}>
            <Card.Content>
                <DateRangePicker
                    range={selectedRange}
                    onChange={(range: DateRange) => dispatch(setDashboardSelectedRange(range))} />
                <View style={styles.multiItemPickerStyle}>
                    <MultiItemPicker
                        items={dropDownValues}
                        label='Spot'
                        selectedItems={selectedItems}
                        onChange={(selectedItems) => handleMultiItemPickerChange(selectedItems)} />
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    multiItemPickerStyle: {
        marginTop: 8
    }
});

export default DashboardHeader;