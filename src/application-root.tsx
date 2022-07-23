import React, {useCallback} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useComponentDidMount} from './hooks/useComponentDidMount';
import {useAppDispatch, useAppSelector} from './redux/store/store';
import {applicationMounted} from './redux/reducers/application/application-reducer';
import ApplicationNavigator from './navigation/application-navigator';

const ApplicationRoot = () => {
    const applicationInitialized = useAppSelector(state => state.application.applicationInitialized);

    const dispatch = useAppDispatch();

    useComponentDidMount(async () => {
        dispatch(applicationMounted());
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
