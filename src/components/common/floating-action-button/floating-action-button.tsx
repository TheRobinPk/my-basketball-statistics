import React, { useState } from 'react';
import {Portal, Provider, FAB as FloatingActionButtonRn} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import colors from '../../../colors';

interface FloatingActionButtonAction {
    icon: string;
    title: string;
    pressHandler: () => void;
}

interface IProps {
    icon: string;
    openIcon: string;
    actions: FloatingActionButtonAction[];
}

const FloatingActionButton = (props: IProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const { icon, openIcon, actions } = props;

    return (
        <Provider>
            <Portal>
                <FloatingActionButtonRn.Group
                    testID='floating-action-button'
                    fabStyle={styles.floatingButtonStyle}
                    color={colors.accentColor}
                    open={open}
                    visible
                    icon={open ? openIcon : icon}
                    actions={actions.map((action) => {
                        return {
                            icon: action.icon,
                            label: action.title,
                            color: colors.accentColor,
                            style: styles.actionIconStyle,
                            labelStyle: styles.actionIconLabelStyle,
                            labelTextColor: colors.accentColor,
                            onPress: action.pressHandler
                        };
                    })}
                    onStateChange={({ open }) => setOpen(open)} />
            </Portal>
        </Provider>
    );
};

const styles = StyleSheet.create({
    floatingButtonStyle: {
        backgroundColor: colors.primaryColor
    },
    actionIconStyle: {
        backgroundColor: colors.primaryColor
    },
    actionIconLabelStyle: {
        backgroundColor: colors.primaryColor
    }
});

export default FloatingActionButton;
