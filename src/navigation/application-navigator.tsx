import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ApplicationDrawer from './application-drawer/application-drawer';
import ShootAroundDashboardStackNavigator from './shoot-around-stack-navigator';
import ShootAroundListScreen from '../screens/data-management/shoot-around-list-screen';
import AboutScreen from '../screens/about/about-screen';

export type RootDrawerParamList = {
    ShootAroundDashboardStackNavigator: undefined;
    ShootAroundListScreen: undefined;
    AboutScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const ApplicationNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='ShootAroundDashboardStackNavigator'
            drawerContent={(props) => <ApplicationDrawer drawerContentProps={props} />}
            screenOptions={{
                headerShown: false
            }}>
            <Drawer.Screen
                name='ShootAroundDashboardStackNavigator'
                component={ShootAroundDashboardStackNavigator} />
            <Drawer.Screen
                name='ShootAroundListScreen'
                component={ShootAroundListScreen} />
            <Drawer.Screen
                name='AboutScreen'
                component={AboutScreen} />
        </Drawer.Navigator>
    );
};

export default ApplicationNavigator;