import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from '@rneui/base';
import Toast from 'react-native-toast-message';
import BasketballCourt from '../components/basketball-court/basketball-court';
import colors from '../colors';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {
    setAddShootAroundSubmitSuccess,
    setMadeAttempts, setShootAroundSpot,
    setTotalAttempts,
    submitShootAround
} from '../redux/reducers/add-shootaround/add-shootaround-reducer';
import {ShootAroundSpot} from '../domain/shoot-around';

const AddShootAroundScreen = () => {
    const totalAttempts = useAppSelector(state => state.addShootAround.totalAttempts);
    const madeAttempts = useAppSelector(state => state.addShootAround.madeAttempts);
    const shootAroundSpot = useAppSelector(state => state.addShootAround.shootAroundSpot);
    const isLoading = useAppSelector(state => state.addShootAround.isLoading);
    const submitDisabled = useAppSelector(state => state.addShootAround.submitDisabled);
    const submitSuccess = useAppSelector(state => state.addShootAround.submitSuccess);
    const error = useAppSelector(state => state.addShootAround.error);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (submitSuccess) {
            Toast.show({
                position: 'bottom',
                type: 'success',
                text1: 'Saved successfully',
                autoHide: false,
                onHide: () => dispatch(setAddShootAroundSubmitSuccess(false)),
            });
        }
    }, [submitSuccess]);

    return (
        <View testID='add-shoot-around-container' style={styles.container}>
            <BasketballCourt
                selectedSpot={shootAroundSpot}
                onSpotSelected={(selectedSpot: ShootAroundSpot) => dispatch(setShootAroundSpot(selectedSpot))} />
            <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                    <Text
                        testID='total-attempts-text-input-title'
                        style={styles.labelTitle}>
                        Total Attempts
                    </Text>
                    <TextInput
                        testID='total-attempts-text-input'
                        style={styles.textInputStyle}
                        editable
                        placeholder='Total Attempts...'
                        keyboardType='numeric'
                        autoCapitalize='none'
                        contextMenuHidden
                        value={totalAttempts?.toString()}
                        onChangeText={(value) => dispatch(setTotalAttempts(value))} />
                </View>
                <View style={styles.columnContainer}>
                    <Text
                        testID='made-attempts-text-input-title'
                        style={styles.labelTitle}>
                        Made Attempts
                    </Text>
                    <TextInput
                        testID='made-attempts-text-input'
                        style={styles.textInputStyle}
                        editable
                        placeholder='Made Attempts...'
                        keyboardType='numeric'
                        autoCapitalize='none'
                        contextMenuHidden
                        value={madeAttempts?.toString()}
                        onChangeText={(value) => dispatch(setMadeAttempts(value))} />
                </View>
            </View>
            {error.isPresent && (
                <View>
                    <Text testID='add-shoot-around-error-text'>{error.text}</Text>
                </View>
            )}
            <Button
                testID='add-shoot-around-submit-button'
                title='Submit'
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: colors.white}}
                disabled={submitDisabled}
                loading={isLoading}
                onPress={() => dispatch(submitShootAround())} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    },
    labelTitle: {
        fontWeight: 'bold',
        color: colors.accentColor,
        fontSize: 16
    },
    textInputStyle: {
        color: colors.grey,
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginEnd: 16,
        height: 32
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginBottom: 8
    },
    columnContainer: {
        width: '50%'
    },
    buttonStyle: {
        marginStart: 8,
        marginEnd: 8,
        backgroundColor: colors.accentColor
    }
});

export default AddShootAroundScreen;
