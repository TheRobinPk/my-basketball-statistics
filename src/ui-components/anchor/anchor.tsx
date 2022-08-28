import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import colors from '../../static/colors';

interface IProps {
    href: string;
    label: string;
}

const Anchor = (props: IProps) => {

    const handlePress = (href: string) => {
        WebBrowser.openBrowserAsync(href);
    };

    return (
        <Text style={styles.textStyle} onPress={() => handlePress(props.href)}>
            {props.label}
        </Text>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        color: colors.anchor,
        marginVertical: 8,
        marginLeft: 16
    }
});

export default Anchor;