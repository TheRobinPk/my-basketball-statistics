import 'reflect-metadata';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationRoot from './src/application-root';
import ApplicationProvider from './src/context/application-context';

const App = () => {
    return (
        <NavigationContainer>
            <ApplicationProvider>
                <PaperProvider>
                    <ApplicationRoot />
                </PaperProvider>
            </ApplicationProvider>
        </NavigationContainer>
    );
};

export default App;