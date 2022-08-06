import React from 'react';
import {Text} from 'react-native';

interface IProps {
    isEmpty: boolean;
    emptyText: string;
    children: React.ReactNode;
}

const EmptyWrapper = (props: IProps) => {
    return (
        <>
            {props.isEmpty ?
                <Text>{props.emptyText}</Text> :
                props.children
            }
        </>
    );
};

export default EmptyWrapper;