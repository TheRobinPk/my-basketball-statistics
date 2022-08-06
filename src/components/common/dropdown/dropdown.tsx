import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';
import colors from '../../../colors';

interface IProps {
    items: DropDownItem[];
    label: string;
    placeholder?: string;
    selectedItem?: DropDownItem;
    onChange: (selectedValue: DropDownItem) => void;
}

export interface DropDownItem {
    key: string;
    label: string;
}

const Dropdown = (props: IProps) => {
    const[open, setOpen] = useState<boolean>(false);

    const handleItemSelected = (selectedItem: DropDownItem) => {
        setOpen(false);
        props.onChange(selectedItem);
    };

    return (
        <View style={styles.container} testID='dropdown-container'>
            <Text style={styles.labelStyle}>{props.label}</Text>
            <Menu
                visible={open}
                contentStyle={styles.menuContentStyle}
                onDismiss={() => setOpen(false)}
                anchor={
                    <TouchableOpacity
                        testID='dropdown-input'
                        style={styles.touchableOpacityStyle}
                        onPress={() => setOpen(true)}>
                        <Text>
                            {props.selectedItem?.label || props.placeholder || 'Select...'}
                        </Text>
                        <MaterialIcons name='arrow-drop-down' size={18} color={colors.primaryColor} />
                    </TouchableOpacity>
                }>
                {props.items.map((item) => {
                    return (
                        <React.Fragment key={item.key}>
                            <Menu.Item
                                title={item.label}
                                titleStyle={props.selectedItem?.key === item.key ? styles.selectedMenuItemContentStyle : null}
                                onPress={() => handleItemSelected(item)} />
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </Menu>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginLeft: 4,
        marginRight: 4
    },
    touchableOpacityStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 160,
        padding: 8,
        borderStyle: 'solid',
        borderColor: colors.primaryColor,
        borderWidth: 1
    },
    labelStyle: {
        fontSize: 10,
        color: colors.primaryColor,
        marginLeft: 4
    },
    menuContentStyle: {
        backgroundColor: colors.white
    },
    selectedMenuItemContentStyle: {
        color: colors.primaryColor,
        fontWeight: '700'
    }
});

export default Dropdown;