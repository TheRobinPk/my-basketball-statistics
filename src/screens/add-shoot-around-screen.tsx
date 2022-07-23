import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import BasketballCourt from '../components/basketball-court/basketball-court';
import Button from '../components/common/button/button';
import Snackbar from '../components/common/snackbar/snackbar';
import { MaterialIcons } from '@expo/vector-icons';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {ShootAroundSpot} from '../domain/shoot-around';
import {
    resetShootAroundForm,
    setAddShootAroundSubmitSuccess,
    setShootAroundFormValues,
    submitShootAround
} from '../redux/reducers/add-shootaround/add-shootaround-reducer';
import colors from '../colors';
import {useComponentWillUnmount} from '../hooks/useComponentWillUnmount';

const AddShootAroundScreen = () => {
    const totalAttempts = useAppSelector(state => state.addShootAround.totalAttempts);
    const madeAttempts = useAppSelector(state => state.addShootAround.madeAttempts);
    const shootAroundSpot = useAppSelector(state => state.addShootAround.shootAroundSpot);
    const isLoading = useAppSelector(state => state.addShootAround.isLoading);
    const submitDisabled = useAppSelector(state => state.addShootAround.submitDisabled);
    const submitSuccess = useAppSelector(state => state.addShootAround.submitSuccess);

    const dispatch = useAppDispatch();

    useComponentWillUnmount(() => {
        dispatch(resetShootAroundForm());
    });

    return (
        <>
            <View testID='add-shoot-around-container' style={styles.container}>
                <View>
                    <BasketballCourt
                        selectedSpot={shootAroundSpot}
                        onSpotSelected={(selectedSpot: ShootAroundSpot) => {
                            dispatch(setShootAroundFormValues({
                                totalAttempts: totalAttempts,
                                madeAttempts: madeAttempts,
                                shootAroundSpot: selectedSpot
                            }));
                        }} />
                    {(shootAroundSpot === undefined) && (
                        <View style={styles.basketballCourtInfoStyle}>
                            <MaterialIcons name='info' size={18} color={colors.primaryColor} />
                            <Text testID='basketball-court-info-text' style={styles.basketballCourtInfoTextStyle}>
                                You can select a shooting spot by tapping on the spot
                            </Text>
                        </View>
                    )}
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
                                onChangeText={(value) => {
                                    dispatch(setShootAroundFormValues({
                                        totalAttempts: value,
                                        madeAttempts: madeAttempts,
                                        shootAroundSpot: shootAroundSpot
                                    }));
                                }} />
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
                                onChangeText={(value) => {
                                    dispatch(setShootAroundFormValues({
                                        totalAttempts: totalAttempts,
                                        madeAttempts: value,
                                        shootAroundSpot: shootAroundSpot
                                    }));
                                }} />
                        </View>
                    </View>
                </View>
                <View style={styles.submitButtonContainerStyle}>
                    <Button
                        label='Submit'
                        testID='add-shoot-around-submit-button'
                        labelTestID='add-shoot-around-submit-button-label'
                        disabled={submitDisabled}
                        loading={isLoading}
                        onPress={() => dispatch(submitShootAround())} />
                </View>
            </View>
            <Snackbar
                label='Saved successfully'
                testID='add-shoot-success-snackbar'
                labelTestID='add-shoot-success-snackbar-label'
                visible={submitSuccess}
                duration={2000}
                onDismiss={() => dispatch(setAddShootAroundSubmitSuccess(false))} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between'
    },
    labelTitle: {
        fontWeight: 'bold',
        color: colors.primaryColor,
        fontSize: 16
    },
    textInputStyle: {
        fontSize: 14,
        borderBottomWidth: 1,
        marginEnd: 16,
        height: 32
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 8
    },
    columnContainer: {
        width: '50%'
    },
    basketballCourtInfoStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 4
    },
    basketballCourtInfoTextStyle: {
        color: colors.primaryColor,
        marginLeft: 4,
        fontSize: 12,
        fontStyle: 'italic'
    },
    submitButtonContainerStyle: {
        width: 160,
        alignSelf: 'center',
        marginBottom: 16
    }
});

export default AddShootAroundScreen;