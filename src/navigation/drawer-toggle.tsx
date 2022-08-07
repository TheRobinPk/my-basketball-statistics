import React from 'react';
import {IconButton} from 'react-native-paper';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import colors from '../colors';

const DrawerToggle = () => {
    const navigation = useNavigation();

    return (
        <IconButton
            icon='menu'
            iconColor={colors.white}
            size={24}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} />
    );
};

export default DrawerToggle;
