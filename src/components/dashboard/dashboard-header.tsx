import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {AnimatedSection, useCollapsible} from 'reanimated-collapsible-helpers';
import DateRangePicker, {DateRange} from '../common/date-picker/date-range-picker';
import Switch, {ISwitchOption} from '../common/switch/switch';
import MultiTagSelect, {ITagItem} from '../common/multi-tag-select/multi-tag-select';
import Button from '../common/button/button';
import {ShootAroundSpot} from '../../domain/shoot-around';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import {DataAggregationType, getDashboardChartData, setDashboardDataAggregationType, setDashboardDateRange, setDashboardShootAroundSpots} from '../../redux/reducers/dashboard/dashboard-reducer';
import colors from '../../static/colors';
import i18n from '../../i18n/i18n';
import ShootAroundSpotMap from '../../static/shoot-around-spot-map';

const dataAggregationTypeItems: ISwitchOption[] = [
    {
        key: 'day',
        label: i18n.t('general.day')
    },
    {
        key: 'week',
        label: i18n.t('general.week')
    },
    {
        key: 'month',
        label: i18n.t('general.month')
    }
];

const shootAroundSpotTags: ITagItem[] = Array.from(ShootAroundSpotMap.values()).map((shootAroundSpot) => {
   return {
       key: shootAroundSpot.spot.toString(),
       label: shootAroundSpot.translation
   };
});

const DashboardHeader = () => {
    const dateRange = useAppSelector(state => state.dashboard.dateRange);
    const dataAggregationType = useAppSelector(state => state.dashboard.dataAggregationType);
    const shootAroundSpots = useAppSelector(state => state.dashboard.shootAroundSpots);

    const dispatch = useAppDispatch();

    const { animatedHeight, onPress, onLayout, state } = useCollapsible();

    const selectedDataAggregationType = dataAggregationTypeItems.find((item) => item.key === dataAggregationType);

    const selectedShootAroundSpotKeys = shootAroundSpots.map((spot) => spot.toString());
    const selectedShootAroundSpots = shootAroundSpotTags.filter((value) => selectedShootAroundSpotKeys.includes(value.key));

    const handleSelectedFilterSpotsChange = (selectedItems: ITagItem[]) => {
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
                <TouchableOpacity onPress={onPress} activeOpacity={1}>
                    <Card.Title
                        title={i18n.t('general.filters')}
                        right={() => (
                            <View style={styles.filterSectionIconStyle}>
                                <MaterialCommunityIcons name={state === 'expanded' ? 'chevron-up' : 'chevron-down'} size={24} color={colors.black} />
                            </View>
                        )} />
                </TouchableOpacity>
                <AnimatedSection onLayout={onLayout} animatedHeight={animatedHeight} state={state}>
                    <Card.Content>
                        <Divider />
                        {renderFilterSection(
                            <DateRangePicker
                                dateRange={dateRange}
                                onDateRangeSelected={(dateRange: DateRange) => dispatch(setDashboardDateRange(dateRange))} />,
                            i18n.t('screens.dashboard.showDataBetween')
                        )}
                        {renderFilterSection(
                            <Switch
                                options={dataAggregationTypeItems}
                                value={selectedDataAggregationType?.key || ''}
                                onPress={(value) => dispatch(setDashboardDataAggregationType(value as DataAggregationType))} />,
                            i18n.t('screens.dashboard.groupDataBy')
                        )}
                        {renderFilterSection(
                            <MultiTagSelect
                                items={shootAroundSpotTags}
                                selectedItems={selectedShootAroundSpots}
                                onChange={(selectedItems: ITagItem[]) => handleSelectedFilterSpotsChange(selectedItems)} />,
                            i18n.t('general.shootAroundSpots')
                        )}
                        <Divider />
                        <View style={styles.applyButtonStyle}>
                            <Button
                                label={i18n.t('general.apply')}
                                type='primary'
                                onPress={() => dispatch(getDashboardChartData())} />
                        </View>
                    </Card.Content>
                </AnimatedSection>
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
    },
    filterSectionTextStyle: {
        color: colors.darkerGrey,
        marginBottom: 4
    },
    filterSectionIconStyle: {
        marginRight: 16
    },
    applyButtonStyle: {
        marginVertical: 8
    }
});

export default DashboardHeader;