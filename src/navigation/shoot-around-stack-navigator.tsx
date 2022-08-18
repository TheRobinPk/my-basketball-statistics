import React from 'react';
import ShootAroundDashboardScreen from '../screens/shoot-around/shoot-around-dashboard/shoot-around-dashboard-screen';
import AddShootAroundScreen from '../screens/shoot-around/add-shoot-around/add-shoot-around-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type ShootAroundStackNavigatorParamList = {
    ShootAroundDashboardScreen: undefined;
    AddShootAroundScreen: undefined;
};

const Stack = createNativeStackNavigator<ShootAroundStackNavigatorParamList>();

const ShootAroundDashboardStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
        }}>
            <Stack.Screen
                name='ShootAroundDashboardScreen'
                component={ShootAroundDashboardScreen} />
            <Stack.Screen
                name='AddShootAroundScreen'
                component={AddShootAroundScreen} />
        </Stack.Navigator>
    );

};

export default ShootAroundDashboardStackNavigator;