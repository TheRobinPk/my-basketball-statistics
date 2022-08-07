import React from 'react';
import colors from '../colors';
import DashboardScreen from '../screens/shoot-around/dashboard-screen';
import AddShootAroundScreen from '../screens/shoot-around/add-shoot-around-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerToggle from './drawer-toggle';

export type ShootAroundStackNavigatorParamList = {
    DashboardScreen: undefined;
    AddShootAroundScreen: undefined;
};

const Stack = createNativeStackNavigator<ShootAroundStackNavigatorParamList>();

const ShootAroundDashboardStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primaryColor
                },
                headerTintColor: colors.white
        }}>
            <Stack.Screen
                name='DashboardScreen'
                component={DashboardScreen}
                options={{
                    title: 'Dashboardv2',
                    // eslint-disable-next-line react/no-multi-comp
                    headerLeft: () => <DrawerToggle />
                }} />
            <Stack.Screen
                name='AddShootAroundScreen'
                component={AddShootAroundScreen}
                options={{
                    title: 'Add Shoot Around'
                }} />
        </Stack.Navigator>
    );

};

export default ShootAroundDashboardStackNavigator;