import React from 'react';
import Table, {ITableColumn} from '../../components/common/table/table';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import LoadingWrapper from '../../components/common/loading-wrapper/loading-wrapper';
import {useComponentDidMount} from '../../hooks/useComponentDidMount';
import {getShootAroundListData, resetShootAroundList} from '../../redux/reducers/shoot-around-list/shoot-around-list-reducer';
import {useComponentWillUnmount} from '../../hooks/useComponentWillUnmount';

export interface IShootAroundListRow {
    key: string;
    dateTime: string;
    totalAttempts: string;
    madeAttempts: string;
    spot: string;
}

const ShootAroundListScreen = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(state => state.shootAroundList.isLoading);
    const data = useAppSelector(state => state.shootAroundList.data);

    useComponentDidMount(() => {
       dispatch(getShootAroundListData());
    });

    useComponentWillUnmount(() => {
        dispatch(resetShootAroundList());
    });

    const rows: IShootAroundListRow[] = data.map((shootAround) => {
        return {
            key: shootAround.id?.toString() || '-1',
            totalAttempts: shootAround.totalAttempts.toString(),
            madeAttempts: shootAround.madeAttempts.toString(),
            spot: shootAround.spot.toString(),
            dateTime: shootAround.dateTime.format('YYYY-MM-DD HH:mm')
        };
    });
    const columns: ITableColumn<IShootAroundListRow>[] = [
        {
            key: 'dateTime',
            dataKey: 'dateTime',
            title: 'Date',
            width: 150
        },
        {
            key: 'totalAttempts',
            dataKey: 'totalAttempts',
            title: 'Total Attempts',
            width: 50
        },
        {
            key: 'madeAttempts',
            dataKey: 'madeAttempts',
            title: 'Made Attempts',
            width: 50
        },
        {
            key: 'spot',
            dataKey: 'spot',
            title: 'Spot',
            width: 150
        }
    ];

    return (
        <>
            <LoadingWrapper isLoading={isLoading}>
                <Table<IShootAroundListRow> columns={columns} rows={rows} />
            </LoadingWrapper>
        </>
    );
};

export default ShootAroundListScreen;