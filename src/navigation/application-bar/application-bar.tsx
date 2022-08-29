import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import colors from '../../static/colors';

interface IProps {
    title: string;
    showDrawerToggle?: boolean;
    showGoBack?: boolean;
}

const ApplicationBar = (props: IProps) => {
    const navigation = useNavigation();

    return (
        <Appbar style={styles.appBarStyle} mode='small'>
            {props.showGoBack && (
                <Appbar.Action
                    testID='go-back'
                    icon='arrow-left'
                    iconColor={colors.white}
                    onPress={() => navigation.goBack()} />
            )}
            {props.showDrawerToggle && (
                <Appbar.Action
                    testID='menu'
                    icon='menu'
                    iconColor={colors.white}
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} />
            )}
            <Appbar.Content title={props.title} titleStyle={{ color: colors.white }} />
        </Appbar>
    );
};

const styles = StyleSheet.create({
    appBarStyle: {
        backgroundColor: colors.primaryColor
    }
});

export default ApplicationBar;