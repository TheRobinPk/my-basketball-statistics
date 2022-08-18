import React, {useReducer} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {HelperText} from 'react-native-paper';
import ApplicationBar from '../../navigation/application-bar/application-bar';
import BasketballCourt from '../../components/basketball-court/basketball-court';
import Button from '../../components/common/button/button';
import Snackbar from '../../components/common/snackbar/snackbar';
import {ShootAround, ShootAroundSpot} from '../../domain/shoot-around';
import colors from '../../static/colors';
import i18n from '../../i18n/i18n';
import {addShootAroundReducer, initialState} from '../../reducers/add-shoot-around/add-shoot-around-reducer';
import {useNavigation} from '@react-navigation/native';
import {useComponentDidMount} from '../../hooks/useComponentDidMount';
import moment from 'moment';
import {useApplicationContext} from '../../context/application-context';

const AddShootAroundScreen = () => {
    const [state, dispatch] = useReducer(addShootAroundReducer, initialState);
    const applicationContext = useApplicationContext();
    const { shootAroundService } = applicationContext;
    const navigation = useNavigation();

    const { totalAttempts, madeAttempts, shootAroundSpot, isLoading, submitDisabled, submitSuccess } = state;

    useComponentDidMount(async () => {
        navigation.addListener('blur', () => {
            dispatch({ type: 'reset' });
        });
    });

    const submitShootAround = async () => {
        if (!submitDisabled) {
            const shootAround: ShootAround = {
                totalAttempts: parseInt(totalAttempts),
                madeAttempts: parseInt(madeAttempts),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                spot: shootAroundSpot!,
                dateTime: moment()
            };

            await shootAroundService?.insert(shootAround);
            dispatch({
                type: 'setFormValues',
                payload: {
                    totalAttempts: initialState.totalAttempts,
                    madeAttempts: initialState.madeAttempts,
                    shootAroundSpot: initialState.shootAroundSpot
                }
            });
            dispatch({ type: 'setSubmitSuccess', payload: true });
        }
    };

    return (
        <>
            <ApplicationBar title={i18n.t('screens.dashboard.addShootAround')} showGoBack />
            <View testID='add-shoot-around-container' style={styles.container}>
                <View>
                    <BasketballCourt
                        selectedSpot={shootAroundSpot}
                        onSpotSelected={(selectedSpot: ShootAroundSpot) => {
                            dispatch({
                                type: 'setFormValues',
                                payload: {
                                    totalAttempts: totalAttempts,
                                    madeAttempts: madeAttempts,
                                    shootAroundSpot: selectedSpot
                                }
                            });
                        }} />
                    <HelperText
                        type='info'
                        style={styles.basketballCourtInfoStyle}
                        visible={shootAroundSpot === undefined}>
                        <Text testID='basketball-court-info-text' style={styles.basketballCourtInfoTextStyle}>
                            {i18n.t('screens.addShootAround.helperText')}
                        </Text>
                    </HelperText>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='total-attempts-text-input-title'
                                style={styles.labelTitle}>
                                {i18n.t('general.totalAttempts')}
                            </Text>
                            <TextInput
                                testID='total-attempts-text-input'
                                style={styles.textInputStyle}
                                editable
                                placeholder={`${i18n.t('general.totalAttempts')}...`}
                                keyboardType='numeric'
                                autoCapitalize='none'
                                contextMenuHidden
                                value={totalAttempts?.toString()}
                                onChangeText={(value) => {
                                    dispatch({
                                        type: 'setFormValues',
                                        payload: {
                                            totalAttempts: value,
                                            madeAttempts: madeAttempts,
                                            shootAroundSpot: shootAroundSpot
                                        }
                                    });
                                }} />
                        </View>
                        <View style={styles.columnContainer}>
                            <Text
                                testID='made-attempts-text-input-title'
                                style={styles.labelTitle}>
                                {i18n.t('general.madeAttempts')}
                            </Text>
                            <TextInput
                                testID='made-attempts-text-input'
                                style={styles.textInputStyle}
                                editable
                                placeholder={`${i18n.t('general.madeAttempts')}...`}
                                keyboardType='numeric'
                                autoCapitalize='none'
                                contextMenuHidden
                                value={madeAttempts?.toString()}
                                onChangeText={(value) => {
                                    dispatch({
                                        type: 'setFormValues',
                                        payload: {
                                            totalAttempts: totalAttempts,
                                            madeAttempts: value,
                                            shootAroundSpot: shootAroundSpot
                                        }
                                    });
                                }} />
                        </View>
                    </View>
                </View>
                <View style={styles.submitButtonContainerStyle}>
                    <Button
                        label={i18n.t('general.save')}
                        type='primary'
                        disabled={submitDisabled}
                        loading={isLoading}
                        testID='add-shoot-around-button'
                        labelTestID='add-shoot-around-button-text'
                        onPress={submitShootAround} />
                </View>
            </View>
            <Snackbar
                label={i18n.t('general.savedSuccessfully')}
                testID='add-shoot-success-snackbar'
                labelTestID='add-shoot-success-snackbar-label'
                visible={submitSuccess}
                duration={2000}
                onDismiss={() => dispatch({
                    type: 'setSubmitSuccess',
                    payload: false
                })} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'flex-start'
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
        marginTop: 16,
        alignSelf: 'center'
    }
});

export default AddShootAroundScreen;