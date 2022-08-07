import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ShootAroundDashboardStackNavigator from './shoot-around-stack-navigator';
import ShootAroundListScreen from '../screens/data-management/shoot-around-list-screen';

export type RootDrawerParamList = {
    ShootAroundDashboardStackNavigator: undefined;
    ShootAroundListScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const ApplicationNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='ShootAroundDashboardStackNavigator'
            screenOptions={{
                headerShown: false
            }}>
            <Drawer.Screen
                name='ShootAroundDashboardStackNavigator'
                options={{
                    drawerLabel: 'Shoot Around Dashboard'
                }}
                component={ShootAroundDashboardStackNavigator} />
            <Drawer.Screen
                name='ShootAroundListScreen'
                component={ShootAroundListScreen} />
        </Drawer.Navigator>
    );
};

export default ApplicationNavigator;