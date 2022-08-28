import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Anchor from '../../ui-components/anchor/anchor';
import ApplicationBar from '../../navigation/application-bar/application-bar';
import Constants from 'expo-constants';
import colors from '../../static/colors';
import i18n from '../../i18n/i18n';

const AboutScreen = () => {
    return (
        <>
            <ApplicationBar title={i18n.t('general.about')} showDrawerToggle />
            <View>
                <View style={styles.headerContainer}>
                    <View style={styles.appNameContainer}>
                        <Image source={require('../../../assets/icon.png')} style={styles.appImageStyle} />
                        <Text style={styles.appNameStyle} variant='headlineSmall'>{i18n.t('general.appName')}</Text>
                    </View>
                    <Text style={styles.appVersionStyle} variant='bodySmall'>
                        {i18n.t('screens.about.appVersion')}: {Constants.manifest?.version}
                    </Text>
                </View>
                <Anchor href='https://cszoltan422.github.io/basketball-shootaround-app/privacy' label={i18n.t('screens.about.privacyPolicy')} />
                <Anchor href='https://cszoltan422.github.io/basketball-shootaround-app/terms' label={i18n.t('screens.about.termsAndConditions')} />
                <Anchor href='https://cszoltan422.github.io/basketball-shootaround-app/third-party-licenses' label={i18n.t('screens.about.thirdPartyLicenses')} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor:
        colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: Dimensions.get('window').height / 4
    },
    appNameContainer: {
        alignItems: 'center'
    },
    appImageStyle: {
        width: 64,
        height: 64
    },
    appNameStyle: {
        color: colors.white
    },
    appVersionStyle: {
        color: colors.lightGrey
    }
});

export default AboutScreen;