import React from 'react';
import Table, {ITableColumn} from '../../components/common/table/table';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import LoadingWrapper from '../../components/common/loading-wrapper/loading-wrapper';
import {useComponentDidMount} from '../../hooks/useComponentDidMount';
import {deleteShootAround, getShootAroundListData, resetShootAroundList} from '../../redux/reducers/shoot-around-list/shoot-around-list-reducer';
import {useComponentWillUnmount} from '../../hooks/useComponentWillUnmount';
import ApplicationBar from '../../navigation/application-bar/application-bar';

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

    const onDeleteShootAround = (shootAroundRow: IShootAroundListRow) => {
        dispatch(deleteShootAround(parseInt(shootAroundRow.key)));
    };

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
            sortFunction: (a, b) => a.dateTime.localeCompare(b.dateTime),
            width: 100
        },
        {
            key: 'totalAttempts',
            dataKey: 'totalAttempts',
            title: 'Total Attempts',
            sortFunction: (a, b) => parseInt(a.totalAttempts) - parseInt(b.totalAttempts),
            width: 50
        },
        {
            key: 'madeAttempts',
            dataKey: 'madeAttempts',
            title: 'Made Attempts',
            sortFunction: (a, b) => parseInt(a.madeAttempts) - parseInt(b.madeAttempts),
            width: 50
        },
        {
            key: 'spot',
            dataKey: 'spot',
            title: 'Spot',
            sortFunction: (a, b) => a.spot.localeCompare(b.spot),
            width: 150
        }
    ];

    return (
        <>
            <ApplicationBar title='Shoot Around List' showDrawerToggle />
            <LoadingWrapper isLoading={isLoading}>
                <Table<IShootAroundListRow>
                    columns={columns}
                    rows={rows}
                    rowDelete={{
                        dialogTitle: 'Are you sure you want to delete the Shoot Around?',
                        onDelete: (row: IShootAroundListRow) => onDeleteShootAround(row)
                    }}
                    pagination={{
                        pageSize: 20
                    }} />
            </LoadingWrapper>
        </>
    );
};

export default ShootAroundListScreen;