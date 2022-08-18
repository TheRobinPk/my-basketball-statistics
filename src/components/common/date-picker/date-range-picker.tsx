import React, {useState} from 'react';
import {Moment} from 'moment/moment';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import CalendarRangePicker from './calendar-range-picker';
import colors from '../../../static/colors';

export type DateRange = {
    start: Moment;
    end: Moment;
};

interface IProps {
    dateRange: DateRange;
    onDateRangeSelected: (dateRange: DateRange) => void;
}

const DateRangePicker = (props: IProps) => {
    const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
    const { dateRange, onDateRangeSelected } = props;

    return (
        <>
            <TouchableOpacity
                testID='date-range-picker'
                onPress={() => setCalendarVisible(true)}>
                <Text
                    variant='headlineSmall'
                    testID='date-range-picker-text'
                    style={styles.dateRangeLabelTextStyle}>
                    {dateRange.start.format('YYYY-MM-DD')} - {dateRange.end.format('YYYY-MM-DD')}
                </Text>
            </TouchableOpacity>
            {calendarVisible && (
                <CalendarRangePicker
                    dateRange={dateRange}
                    calendarTestId='date-range-picker-calendar'
                    onDateRangeSelected={onDateRangeSelected}
                    setCalendarVisible={setCalendarVisible} />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    dateRangeLabelTextStyle: {
        color: colors.primaryColor
    }
});

export default DateRangePicker;