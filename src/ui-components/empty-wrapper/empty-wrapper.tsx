import React from 'react';
import EmptyState from '../empty-state/empty-state';

interface IProps {
    isEmpty: boolean;
    emptyText?: string;
    children: React.ReactNode;
}

const EmptyWrapper = (props: IProps) => {
    return (
        <>
            {props.isEmpty ?
                <EmptyState text={props.emptyText} /> :
                props.children
            }
        </>
    );
};

export default EmptyWrapper;