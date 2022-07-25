import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Moment} from 'moment';
import {DateTimePickerAndroid, DateTimePickerEvent} from '@react-native-community/datetimepicker';
import colors from '../../../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
            onChange: props.onChange
        });
    };

    return (
        <View testID='date-picker-container'>
            <Text style={styles.labelStyle}>{props.label}</Text>
            <TouchableOpacity
                testID='date-picker-start-date'
                style={styles.touchableOpacityStyle}
                onPress={() => openPicker(props.date)}>
                <Text>
                    {props.date.format(props.dateFormat || 'YYYY-MM-DD')}
                </Text>
                <MaterialCommunityIcons name='calendar-month' size={18} color={colors.primaryColor} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 10,
        color: colors.primaryColor,
        marginLeft: 4
    },
    touchableOpacityStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 140,
        padding: 8,
        borderStyle: 'solid',
        borderColor: colors.primaryColor,
        borderWidth: 1
    }
});

export default DatePicker;