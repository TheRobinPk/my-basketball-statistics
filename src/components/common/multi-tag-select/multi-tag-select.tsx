import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import colors from '../../../static/colors';

export interface ITagItem {
    key: string;
    label: string;
    testID: string;
}

interface IProps {
    items: ITagItem[];
    selectedItems: ITagItem[];
    onChange: (selectedItems: ITagItem[]) => void;
}

const MultiTagSelect = (props: IProps) => {
    const { items, selectedItems, onChange } = props;

    const handleItemSelected = (selectedItem : ITagItem) => {
        if (selectedItems.includes(selectedItem)) {
            const filteredItems = selectedItems.filter((item) => item.key !== selectedItem.key);
            onChange(filteredItems);
        } else {
            onChange([...selectedItems, selectedItem]);
        }
    };

    return (
        <View style={styles.itemsContainer}>
            {items.map((item) => {
                const isSelected = selectedItems.includes(item);
                const chipStyle = isSelected ? styles.selectedTagStyle : styles.tagStyle;
                return (
                    <View key={item.key} style={styles.tagItemContainerStyle}>
                        <Chip
                            style={chipStyle}
                            testID={item.testID}
                            textStyle={styles.tagTextStyle}
                            selectedColor={colors.white}
                            selected={isSelected}
                            onPress={() => handleItemSelected(item)}>
                            {item.label}
                        </Chip>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tagItemContainerStyle: {
        marginRight: 4,
        marginTop: 4
    },
    tagStyle: {
        backgroundColor: colors.primaryColorWithOpacity
    },
    selectedTagStyle: {
        backgroundColor: colors.primaryColor
    },
    tagTextStyle: {
        color: colors.white
    }
});

export default MultiTagSelect;