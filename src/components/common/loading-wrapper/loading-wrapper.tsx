import React from 'react';
import colors from '../../../colors';
import {ActivityIndicator} from 'react-native-paper';

interface IProps {
    isLoading: boolean;
    children: React.ReactNode;
}

const LoadingWrapper = (props: IProps) => {
    return (
        <>
            {props.isLoading ?
                <ActivityIndicator animating color={colors.primaryColor} /> :
                props.children
            }
        </>
    );
};

export default LoadingWrapper;