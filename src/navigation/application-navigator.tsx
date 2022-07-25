import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/dashboard-screen';
import AddShootAroundScreen from '../screens/add-shoot-around-screen';
import colors from '../colors';

export type RootStackParamList = {
    DashboardScreen: undefined;
    AddShootAroundScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primaryColor
            },
            headerTintColor: colors.white
        }}>
            <Stack.Screen
                name='DashboardScreen'
                component={DashboardScreen}
                options={{
                    title: 'Dashboard'
                }} />
            <Stack.Screen
                name='AddShootAroundScreen'
                component={AddShootAroundScreen}
                options={{
                    title: 'Add Shootaround'
                }} />
        </Stack.Navigator>
    );
};

export default ApplicationNavigator;