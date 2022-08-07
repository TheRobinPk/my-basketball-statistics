import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShootAroundListStackParamList} from './application-navigator';
import colors from '../colors';
import DrawerToggle from './drawer-toggle';
import ShootAroundListScreen from '../screens/shoot-around-list-screen';
import AddShootAroundScreen from '../screens/add-shoot-around-screen';

const Stack = createNativeStackNavigator<ShootAroundListStackParamList>();

const ShootAroundListStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primaryColor
                },
                headerTintColor: colors.white
            }}>
            <Stack.Screen
                name='ShootAroundListScreen'
                component={ShootAroundListScreen}
                options={{
                    title: 'Shoot Around List',
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

export default ShootAroundListStackNavigator;