import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShootAroundListStackParamList} from './application-navigator';
import colors from '../colors';
import DrawerToggle from './drawer-toggle';
import ShootAroundListScreen from '../screens/shoot-around-list-screen';

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
                    title: 'Shootaround List',
                    // eslint-disable-next-line react/no-multi-comp
                    headerLeft: () => <DrawerToggle />
                }} />
        </Stack.Navigator>
    );

};

export default ShootAroundListStackNavigator;