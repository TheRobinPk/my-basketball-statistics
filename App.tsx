import 'reflect-metadata';
import 'expo-dev-client';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationRoot from './src/application-root';
import Toast from 'react-native-toast-message';
import store from './src/redux/store/store';

const App = () => {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <ApplicationRoot />
            </Provider>
            <Toast />
        </NavigationContainer>
    );
};

export default App;