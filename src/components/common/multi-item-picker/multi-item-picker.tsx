import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {Divider, Menu} from 'react-native-paper';
import Tag from '../tag/tag';
import colors from '../../../colors';

interface IProps {
    items: DropDownItem[];
    label: string;
    placeholder?: string;
    selectedItems: DropDownItem[];
    onChange: (selectedValues: DropDownItem[]) => void;
}

export interface DropDownItem {
    key: string;
    label: string;
}

const MultiItemPicker = (props: IProps) => {
    const[open, setOpen] = useState<boolean>(false);

    const handleItemPressed = (pressedItem : DropDownItem) => {
        if (props.selectedItems.includes(pressedItem)) {
            const filteredItems = props.selectedItems.filter((item) => item.key !== pressedItem.key);
            props.onChange(filteredItems);
        } else {
            props.onChange([...props.selectedItems, pressedItem]);
        }
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
                        testID='date-picker-start-date'
                        style={styles.touchableOpacityStyle}
                        onPress={() => setOpen(true)}>
                        <Text>
                            {props.selectedItems.length > 0 ? `${props.selectedItems.length} items selected` : props.placeholder || 'Select...'}
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
                                trailingIcon={props.selectedItems.includes(item) ? 'minus-circle-outline' : 'plus-circle-outline'}
                                onPress={() => handleItemPressed(item)} />
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
                                onPress={() => handleItemPressed(item)} />
                        </View>
                    );
                })}
            </View>
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
        width: 140,
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
    }
});

export default MultiItemPicker;