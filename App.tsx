import 'reflect-metadata';
import 'expo-dev-client';
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationRoot from './src/application-root';
import store from './src/redux/store/store';

const App = () => {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <PaperProvider>
                    <ApplicationRoot />
                </PaperProvider>
            </Provider>
        </NavigationContainer>
    );
};

export default App;