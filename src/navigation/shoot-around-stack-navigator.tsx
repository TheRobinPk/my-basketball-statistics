import React from 'react';
import colors from '../colors';
import DashboardScreen from '../screens/dashboard-screen';
import AddShootAroundScreen from '../screens/add-shoot-around-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './application-navigator';
import DrawerToggle from './drawer-toggle';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
                    title: 'Dashboard',
                    // eslint-disable-next-line react/no-multi-comp
                    headerLeft: () => <DrawerToggle />
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

export default ShootAroundDashboardStackNavigator;