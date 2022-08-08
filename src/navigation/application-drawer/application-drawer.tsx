import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../colors';
import {Divider} from 'react-native-paper';

interface IProps {
    drawerContentProps: DrawerContentComponentProps
}

interface DrawerItemIcon {
    focused: boolean;
    size: number;
    color: string;
}

const ApplicationDrawer = (props: IProps) => {

    const getActiveRouteState = (routes: any, index: any, name: any) => {
        return routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
    };

    const renderDrawerItem = (label: string, routeName: string, icon: (props: DrawerItemIcon) => React.ReactNode) => {
        return (
            <DrawerItem
                label={label}
                key={routeName}
                focused={getActiveRouteState(
                    props.drawerContentProps.state.routes,
                    props.drawerContentProps.state.index,
                    routeName
                )}
                style={styles.drawerItemStyle}
                activeTintColor={colors.primaryColor}
                activeBackgroundColor={colors.primaryColorWithOpacity}
                inactiveTintColor={colors.inactiveGrey}
                pressColor={colors.primaryColor}
                icon={icon}
                onPress={() => props.drawerContentProps.navigation.navigate(routeName)} />
        );
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props.drawerContentProps}>
                <View style={styles.drawerHeaderStyle}>
                    <Text style={styles.drawerHeaderTextStyle}>My Basketball Statistics</Text>
                </View>
                {renderDrawerItem(
                    'Dashboard',
                    'ShootAroundDashboardStackNavigator',
                    (props: DrawerItemIcon) => (
                        <MaterialCommunityIcons
                            name='basketball-hoop'
                            size={24}
                            color={props.focused ? colors.primaryColor : colors.inactiveGrey} />
                    )
                )}
                <Divider bold style={styles.dividerStyle} />
                {renderDrawerItem(
                    'Shoot Around List',
                    'ShootAroundListScreen',
                    (props: DrawerItemIcon) => (
                        <MaterialCommunityIcons
                            name='database'
                            size={24}
                            color={props.focused ? colors.primaryColor : colors.inactiveGrey} />
                    )
                )}
                <Divider bold style={styles.dividerStyle} />
            </DrawerContentScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeaderStyle: {
        backgroundColor: colors.primaryColor
    },
    drawerHeaderTextStyle: {
        color: colors.white,
        fontSize: 24,
        flexWrap: 'wrap',
        margin: 16
    },
    drawerItemStyle: {
        borderRadius: 16
    },
    dividerStyle: {
        marginTop: 8,
        marginBottom: 8
    }
});

export default ApplicationDrawer;