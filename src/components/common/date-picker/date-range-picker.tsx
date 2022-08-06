import React from 'react';
import moment, {Moment} from 'moment';
import {StyleSheet, View} from 'react-native';
import DatePicker from './date-picker';

export type DateRange = {
    start: Moment;
    end: Moment;
}

type DateRangeType = 'start' | 'end';

interface IProps {
    value: DateRange,
    onChange: (dateRange: DateRange) => void
}

const DateRangePicker = (props: IProps) => {
    const { value, onChange } = props;
    const { start, end } = value;

    const handleDateChange = (type: DateRangeType, date?: Date) => {
        let selectedStart = start.clone();
        let selectedEnd = end.clone();

        if (type === 'start') {
            selectedStart = moment(date);
            if (selectedStart.isAfter(selectedEnd)) {
                selectedEnd = selectedStart.clone();
            }
        } else {
            selectedEnd = moment(date);
            if (selectedEnd.isBefore(selectedStart)) {
                selectedStart = selectedEnd.clone();
            }
        }

        if (!start.isSame(selectedStart) || !end.isSame(selectedEnd)) {
            onChange({
                start: selectedStart,
                end: selectedEnd
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.datePickerContainerStyle}>
                <DatePicker
                    date={start}
                    label='Start Date'
                    onChange={(event, selectedDate) => handleDateChange('start', selectedDate)} />
            </View>
            <View style={styles.datePickerContainerStyle}>
                <DatePicker
                    date={end}
                    label='End Date'
                    onChange={(event, selectedDate) => handleDateChange('end', selectedDate)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 120,
        flexDirection: 'row'
    },
    datePickerContainerStyle: {
        marginLeft: 4,
        marginRight: 4
    }
});

export default DateRangePicker;