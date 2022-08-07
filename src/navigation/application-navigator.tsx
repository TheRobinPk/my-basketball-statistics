import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ShootAroundDashboardStackNavigator from './shoot-around-stack-navigator';
import ShootAroundListStackNavigator from './shoot-around-list-stack-navigator';
import colors from '../colors';

export type RootStackParamList = {
    DashboardScreen: undefined;
    AddShootAroundScreen: undefined;
};

export type ShootAroundListStackParamList = {
    ShootAroundListScreen: undefined;
    AddShootAroundScreen: undefined;
};

export type RootDrawerParamList = {
    ShootAroundDashboardStackNavigator: undefined;
    ShootAroundListStackNavigator: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const ApplicationNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='ShootAroundDashboardStackNavigator'
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.white,
                drawerActiveBackgroundColor: colors.primaryColor
        }}>
            <Drawer.Screen
                name='ShootAroundDashboardStackNavigator'
                options={{
                    drawerLabel: 'Shoot Around Dashboard'
                }}
                component={ShootAroundDashboardStackNavigator} />
            <Drawer.Screen
                name='ShootAroundListStackNavigator'
                options={{
                    drawerLabel: 'Shoot Around List'
                }}
                component={ShootAroundListStackNavigator} />
        </Drawer.Navigator>
    );
};

export default ApplicationNavigator;