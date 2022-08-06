import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import moment, {Moment} from 'moment';
import {DateTimePickerAndroid, DateTimePickerEvent} from '@react-native-community/datetimepicker';
import colors from '../../../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {commonPickerStyle} from '../styles/styles';

interface IProps {
    date: Moment;
    label: string;
    dateFormat?: string;
    onChange?: (event: DateTimePickerEvent, date?: Date) => void;
}

const DatePicker = (props: IProps) => {
    const openPicker = (date: Moment) => {
        DateTimePickerAndroid.open({
            testID: 'date-picker',
            value: date.toDate(),
            mode: 'date',
            is24Hour: true,
            maximumDate: moment().endOf('year').toDate(),
            minimumDate: moment().startOf('year').toDate(),
            onChange: props.onChange
        });
    };

    return (
        <View testID='date-picker-container'>
            <Text style={commonPickerStyle.labelStyle}>{props.label}</Text>
            <TouchableOpacity
                testID='date-picker-start-date'
                style={commonPickerStyle.touchableOpacityStyle}
                onPress={() => openPicker(props.date)}>
                <Text>
                    {props.date.format(props.dateFormat || 'YYYY-MM-DD')}
                </Text>
                <MaterialCommunityIcons name='calendar-month' size={18} color={colors.primaryColor} />
            </TouchableOpacity>
        </View>
    );
};

export default DatePicker;