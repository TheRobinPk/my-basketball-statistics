import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../static/colors';
import i18n from '../../i18n/i18n';

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
                <View>
                    <Text style={styles.drawerHeaderTextStyle}>My Basketball Statistics</Text>
                </View>
                <Drawer.Section>
                    {renderDrawerItem(
                        i18n.t('general.dashboard'),
                        'ShootAroundDashboardStackNavigator',
                        (props: DrawerItemIcon) => (
                            <MaterialCommunityIcons
                                name='basketball-hoop'
                                size={24}
                                color={props.focused ? colors.primaryColor : colors.inactiveGrey} />
                        )
                    )}
                    {renderDrawerItem(
                        i18n.t('general.shootArounds'),
                        'ShootAroundListScreen',
                        (props: DrawerItemIcon) => (
                            <MaterialCommunityIcons
                                name='database'
                                size={24}
                                color={props.focused ? colors.primaryColor : colors.inactiveGrey} />
                        )
                    )}
                </Drawer.Section>
            </DrawerContentScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeaderTextStyle: {
        color: colors.primaryColor,
        fontSize: 24,
        flexWrap: 'wrap',
        margin: 16
    },
    drawerItemStyle: {
        borderRadius: 32,
        padding: 4
    }
});

export default ApplicationDrawer;