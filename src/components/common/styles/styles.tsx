import {StyleSheet} from 'react-native';
import colors from '../../../colors';

export const commonPickerStyle = StyleSheet.create({
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
    menuItemContentStyle: {
        justifyContent: 'space-between',
        width: 180
    },
    selectedMenuItemContentStyle: {
        color: colors.primaryColor,
        fontWeight: '700'
    }
});