import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../static/colors';
import i18n from '../../../i18n/i18n';

interface IProps {
    text?: string;
}

const EmptyState = (props: IProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <MaterialCommunityIcons name='database-remove' size={96} color={colors.darkerGrey} />
                <Text style={styles.textStyle}>{props.text || i18n.t('general.noResult')}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentWrapper: {
        alignItems: 'center'
    },
    textStyle: {
        color: colors.darkerGrey,
        fontSize: 24
    }
});

export default EmptyState;