import React, {useCallback} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useComponentDidMount} from './hooks/use-component-did-mount';
import ApplicationNavigator from './navigation/application-navigator';
import {useApplicationContext} from './context/application-context';

const ApplicationRoot = () => {
    const applicationContext = useApplicationContext();
    const { applicationInitialized } = applicationContext;

    useComponentDidMount(async () => {
        await SplashScreen.preventAutoHideAsync();
    });

    const onLayoutRootView = useCallback(async () => {
        if (applicationInitialized) {
            await SplashScreen.hideAsync();
        }
    }, [applicationInitialized]);

    if (!applicationInitialized) {
        return null;
    }

    return (
        <SafeAreaView
            testID='application-container'
            onLayout={onLayoutRootView}
            style={styles.content}>
            <ApplicationNavigator />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ApplicationRoot;
