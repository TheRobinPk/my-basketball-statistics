import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';
import colors from '../../../colors';
import {commonPickerStyle} from '../styles/styles';

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
        <View style={commonPickerStyle.container} testID='dropdown-container'>
            <Text style={commonPickerStyle.labelStyle}>{props.label}</Text>
            <Menu
                visible={open}
                contentStyle={commonPickerStyle.menuContentStyle}
                onDismiss={() => setOpen(false)}
                anchor={
                    <TouchableOpacity
                        testID='dropdown-input'
                        style={commonPickerStyle.touchableOpacityStyle}
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
                                titleStyle={props.selectedItem?.key === item.key ? commonPickerStyle.selectedMenuItemContentStyle : null}
                                onPress={() => handleItemSelected(item)} />
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </Menu>
        </View>
    );
};

export default Dropdown;