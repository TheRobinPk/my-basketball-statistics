import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Modal, Portal} from 'react-native-paper';
import {Calendar, DateData} from 'react-native-calendars';
import {DateRange} from './date-range-picker';
import Button from '../button/button';
import moment from 'moment/moment';
import colors from '../../static/colors';
import i18n from '../../i18n/i18n';

type DateRangeType = 'start' | 'end';

interface IProps {
    dateRange: DateRange;
    setCalendarVisible: (visible: boolean) => void;
    onDateRangeSelected: (dateRange: DateRange) => void;
}

const CalendarRangePicker = (props: IProps) => {
    const { dateRange, onDateRangeSelected, setCalendarVisible } = props;
    const [dateRangeTypeSelection, setDateRangeTypeSelection] = useState<DateRangeType>('start');
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(dateRange);

    const handleDayPress = (date: DateData) => {
        const selectedDate = moment(date.dateString);
        let newMarkedStartDate = selectedDateRange.start.clone();
        let newMarkedEndDate = moment(selectedDate);
        let newDateRangeTypeSelection: DateRangeType = 'start';

        if (dateRangeTypeSelection === 'start') {
            newMarkedStartDate = moment(selectedDate);
            newDateRangeTypeSelection = 'end';
        } else if (newMarkedStartDate.isAfter(newMarkedEndDate)) {
            newMarkedEndDate = newMarkedStartDate.clone();
            newDateRangeTypeSelection = 'end';
        }

        setSelectedDateRange({
            start: newMarkedStartDate.clone(),
            end: newMarkedEndDate.clone()
        });
        setDateRangeTypeSelection(newDateRangeTypeSelection);
    };

    const handleApply = () => {
        onDateRangeSelected(selectedDateRange);
        setCalendarVisible(false);
    };

    const markedDates = {};

    let dateToMark = selectedDateRange.start.clone();
    while (dateToMark.isSameOrBefore(selectedDateRange.end)) {
        const formattedDate = dateToMark.format('YYYY-MM-DD');
        const isStartingDay = formattedDate === selectedDateRange.start.format('YYYY-MM-DD');
        const isEndingDay = formattedDate === selectedDateRange.end.format('YYYY-MM-DD');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        markedDates[formattedDate] = {
            startingDay: isStartingDay,
            endingDay: isEndingDay,
            color: colors.primaryColor,
            textColor: 'white'
        };

        dateToMark = dateToMark.clone().add(1, 'day');
    }

    return (
        <Portal>
            <Modal
                visible
                onDismiss={() => setCalendarVisible(false)}>
                <View style={styles.modalContentContainerStyle}>
                    <Calendar
                        markingType='period'
                        markedDates={markedDates}
                        onDayPress={handleDayPress}
                        enableSwipeMonths />
                    <Divider />
                    <View style={styles.actionButtonsContainer}>
                        <Button
                            label={i18n.t('general.cancel')}
                            type='default'
                            onPress={() => setCalendarVisible(false)} />
                        <Button
                            label={i18n.t('general.apply')}
                            type='primary'
                            disabled={dateRangeTypeSelection === 'end'}
                            onPress={handleApply} />
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};


const styles = StyleSheet.create({
    modalContentContainerStyle: {
        marginHorizontal: 20,
        padding: 8,
        backgroundColor: colors.white
    },
    actionButtonsContainer: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default CalendarRangePicker;