import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../../colors';

interface IProps {
    label: string;
    removable?: boolean;
    onPress?: () => void;
}

const Tag = (props: IProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}>
            <Text style={styles.textStyle}>{props.label}</Text>
            {props.removable && (
                <MaterialCommunityIcons name='minus-circle-outline' size={18} color={colors.white} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 16,
        backgroundColor: colors.primaryColor,
        alignSelf: 'flex-start',
        flexDirection: 'row'
    },
    textStyle: {
        fontSize: 12,
        color: colors.white,
        marginRight: 8
    }
});

export default Tag;