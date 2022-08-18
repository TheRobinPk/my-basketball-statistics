import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {AnimatedSection, useCollapsible} from 'reanimated-collapsible-helpers';
import DateRangePicker, {DateRange} from '../common/date-picker/date-range-picker';
import Switch, {ISwitchOption} from '../common/switch/switch';
import MultiTagSelect, {ITagItem} from '../common/multi-tag-select/multi-tag-select';
import {ShootAroundSpot} from '../../domain/shoot-around';
import colors from '../../static/colors';
import i18n from '../../i18n/i18n';
import ShootAroundSpotMap from '../../static/shoot-around-spot-map';
import {DataAggregationType} from '../../reducers/dashboard/dashboard-reducer';

const dataAggregationTypeItems: ISwitchOption[] = [
    {
        key: 'day',
        label: i18n.t('general.day'),
        testID: 'option-day'
    },
    {
        key: 'week',
        label: i18n.t('general.week'),
        testID: 'option-week'
    },
    {
        key: 'month',
        label: i18n.t('general.month'),
        testID: 'option-month'
    }
];

const shootAroundSpotTags: ITagItem[] = Array.from(ShootAroundSpotMap.values()).map((shootAroundSpot) => {
   return {
       key: shootAroundSpot.spot.toString(),
       label: shootAroundSpot.translation,
       testID: `option-${shootAroundSpot.spot.toString().toLowerCase()}`
   };
});

interface IProps {
    dateRange: DateRange,
    dataAggregationType: DataAggregationType | undefined,
    shootAroundSpots: ShootAroundSpot[];
    onDateRangeChanged: (dateRange: DateRange) => void;
    onDataAggregationTypeChanged: (dataAggregationType: DataAggregationType) => void;
    onShootAroundSpotsChanged: (spots: ShootAroundSpot[]) => void;
}

const DashboardHeader = (props: IProps) => {
    const { dateRange, dataAggregationType, shootAroundSpots } = props;

    const { animatedHeight, onPress, onLayout, state } = useCollapsible();

    const selectedDataAggregationType = dataAggregationTypeItems.find((item) => item.key === dataAggregationType);

    const selectedShootAroundSpotKeys = shootAroundSpots.map((spot) => spot.toString());
    const selectedShootAroundSpots = shootAroundSpotTags.filter((value) => selectedShootAroundSpotKeys.includes(value.key));

    const handleSelectedFilterSpotsChange = (selectedItems: ITagItem[]) => {
        props.onShootAroundSpotsChanged(selectedItems.map(item => item.key as ShootAroundSpot));
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
                                onDateRangeSelected={props.onDateRangeChanged} />,
                            i18n.t('screens.dashboard.showDataBetween')
                        )}
                        {renderFilterSection(
                            <Switch
                                options={dataAggregationTypeItems}
                                value={selectedDataAggregationType?.key || ''}
                                onPress={(value) => props.onDataAggregationTypeChanged(value as DataAggregationType)} />,
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
    }
});

export default DashboardHeader;