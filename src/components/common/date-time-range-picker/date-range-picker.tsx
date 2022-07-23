import React from 'react';
import moment, {Moment} from 'moment';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Text, TouchableOpacity, View} from 'react-native';

export type DateRange = {
    start: Moment;
    end: Moment;
}

type DateRangeType = 'start' | 'end';

export interface IProps {
    range: DateRange,
    onChange: (range: DateRange) => void
}

const DateRangePicker = (props: IProps) => {
    const { range, onChange } = props;
    const { start, end } = range;

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

        onChange({
            start: selectedStart,
            end: selectedEnd
        });
    };

    const openPicker = (type: DateRangeType, date: Moment) => {
        DateTimePickerAndroid.open({
            value: date.toDate(),
            mode: 'date',
            is24Hour: true,
            onChange: (event, selectedDate) => handleDateChange(type, selectedDate)
        });
    };

    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => openPicker('start', start)}>
                    <Text>{start.format('YYYY-MM-DD')}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => openPicker('end', end)}>
                    <Text>{end.format('YYYY-MM-DD')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DateRangePicker;