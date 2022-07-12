import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/dashboard-screen';
import colors from '../colors';

export type RootStackParamList = {
    DashboardScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primaryColor
            },
            headerTintColor: 'white'
        }}>
            <Stack.Screen
                name='DashboardScreen'
                component={DashboardScreen}
                options={{
                    title: 'Dashboard'
                }} />
        </Stack.Navigator>
    );
};

export default ApplicationNavigator;