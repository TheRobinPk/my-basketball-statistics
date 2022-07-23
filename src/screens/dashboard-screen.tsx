import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DateRangePicker, {DateRange} from '../components/common/date-time-range-picker/date-range-picker';
import FloatingActionButton from '../components/common/floating-action-button/floating-action-button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/application-navigator';
import colors from '../colors';
import moment from 'moment';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {useComponentDidMount} from '../hooks/useComponentDidMount';
import {setDashboardSelectedRange} from '../redux/reducers/dashboard/dashboard-reducer';

type IProps = NativeStackScreenProps<RootStackParamList, 'DashboardScreen'>;

const DashboardScreen = (props: IProps) => {
    const isLoading = useAppSelector(state => state.dashboard.isLoading);
    const selectedRange = useAppSelector(state => state.dashboard.selectedRange);
    const shootArounds = useAppSelector(state => state.dashboard.shootArounds);

    const dispatch = useAppDispatch();

    useComponentDidMount(() => {
        dispatch(setDashboardSelectedRange({
            start: moment(),
            end: moment()
        }));
    });

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <DateRangePicker
                range={selectedRange}
                onChange={(range: DateRange) => dispatch(setDashboardSelectedRange(range))} />
            <View>
                {shootArounds.map((shootAround) => {
                    return (
                        <View key={shootAround.id}>
                            <Text>
                                {JSON.stringify(shootAround)}
                            </Text>
                        </View>
                    );
                })}
            </View>
            <FloatingActionButton
                icon='plus'
                openIcon='close'
                actions={[
                    {
                        title: 'Add Shootaround',
                        icon: 'basketball-hoop',
                        pressHandler: () => props.navigation.navigate('AddShootAroundScreen')
                    }
                ]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        color: colors.white,
        height: '100%',
        padding: 8
    }
});

export default DashboardScreen;