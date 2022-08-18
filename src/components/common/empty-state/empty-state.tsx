import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../static/colors';
import i18n from '../../../i18n/i18n';

interface IProps {
    text?: string;
}

const EmptyState = (props: IProps) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name='database-remove' size={96} color={colors.darkerGrey} />
            <Text
                testID='empty-state-text'
                style={styles.textStyle}
                variant='headlineLarge'>
                {props.text || i18n.t('general.noResult')}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: colors.darkerGrey,
    }
});

export default EmptyState;