import React, {useState} from 'react';
import {DropDownItem} from './dropdown';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';
import colors from '../../../colors';
import Tag from '../tag/tag';
import {commonPickerStyle} from '../styles/styles';

interface IProps {
    items: DropDownItem[];
    label: string;
    placeholder?: string;
    selectedItems: DropDownItem[];
    onChange: (selectedValues: DropDownItem[]) => void;
}

const DropdownMultiSelect = (props: IProps) => {
    const[open, setOpen] = useState<boolean>(false);

    let placeHolderText = props.placeholder || 'Select...';
    if (props.selectedItems.length > 0) {
        placeHolderText = `${props.selectedItems.length} item(s) selected`;
    }

    const handleItemSelected = (selectedItem : DropDownItem) => {
        if (props.selectedItems.includes(selectedItem)) {
            const filteredItems = props.selectedItems.filter((item) => item.key !== selectedItem.key);
            props.onChange(filteredItems);
        } else {
            props.onChange([...props.selectedItems, selectedItem]);
        }
    };

    return (
        <View style={commonPickerStyle.container} testID='multi-dropdown-container'>
            <Text style={commonPickerStyle.labelStyle}>{props.label}</Text>
            <Menu
                visible={open}
                contentStyle={commonPickerStyle.menuContentStyle}
                onDismiss={() => setOpen(false)}
                anchor={
                    <TouchableOpacity
                        testID='multi-dropdown-input'
                        style={commonPickerStyle.touchableOpacityStyle}
                        onPress={() => setOpen(true)}>
                        <Text>
                            {placeHolderText}
                        </Text>
                        <MaterialIcons name='arrow-drop-down' size={18} color={colors.primaryColor} />
                    </TouchableOpacity>
                }>
                {props.items.map((item) => {
                    return (
                        <React.Fragment key={item.key}>
                            <Menu.Item
                                title={item.label}
                                contentStyle={styles.menuItemContentStyle}
                                titleStyle={props.selectedItems.includes(item) ? commonPickerStyle.selectedMenuItemContentStyle : null}
                                trailingIcon={props.selectedItems.includes(item) ? 'minus-circle-outline' : 'plus-circle-outline'}
                                onPress={() => handleItemSelected(item)} />
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </Menu>
            <View style={styles.selectedItemsContainer}>
                {props.selectedItems.map((item) => {
                    return (
                        <View key={item.key} style={styles.selectedTagItemStyle}>
                            <Tag
                                label={item.label}
                                removable
                                onPress={() => handleItemSelected(item)} />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    menuItemContentStyle: {
        justifyContent: 'space-between',
        width: 180
    },
    selectedItemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    selectedTagItemStyle: {
        marginRight: 4,
        marginTop: 4
    },
});

export default DropdownMultiSelect;