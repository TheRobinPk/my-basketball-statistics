import React, { useState } from 'react';
import {Portal, Provider, FAB as FloatingActionButtonRn} from 'react-native-paper';

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
                    open={open}
                    visible
                    icon={open ? openIcon : icon}
                    actions={actions.map((action) => {
                        return {
                            icon: action.icon,
                            label: action.title,
                            onPress: action.pressHandler
                        };
                    })}
                    onStateChange={({ open }) => setOpen(open)} />
            </Portal>
        </Provider>
    );
};

export default FloatingActionButton;
