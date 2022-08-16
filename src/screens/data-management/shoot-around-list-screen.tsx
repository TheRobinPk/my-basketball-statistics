import React from 'react';
import Table, {ITableColumn} from '../../components/common/table/table';
import {useAppDispatch, useAppSelector} from '../../redux/store/store';
import LoadingWrapper from '../../components/common/loading-wrapper/loading-wrapper';
import {useComponentDidMount} from '../../hooks/useComponentDidMount';
import {deleteShootAround, getShootAroundListData, resetShootAroundList} from '../../redux/reducers/shoot-around-list/shoot-around-list-reducer';
import {useComponentWillUnmount} from '../../hooks/useComponentWillUnmount';
import ApplicationBar from '../../navigation/application-bar/application-bar';
import i18n from '../../i18n/i18n';

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
            title: i18n.t('general.date'),
            sortFunction: (a, b) => a.dateTime.localeCompare(b.dateTime),
            width: 100
        },
        {
            key: 'totalAttempts',
            dataKey: 'totalAttempts',
            title: i18n.t('general.totalAttempts'),
            sortFunction: (a, b) => parseInt(a.totalAttempts) - parseInt(b.totalAttempts),
            width: 50
        },
        {
            key: 'madeAttempts',
            dataKey: 'madeAttempts',
            title: i18n.t('general.madeAttempts'),
            sortFunction: (a, b) => parseInt(a.madeAttempts) - parseInt(b.madeAttempts),
            width: 50
        },
        {
            key: 'spot',
            dataKey: 'spot',
            title: i18n.t('general.spot'),
            sortFunction: (a, b) => a.spot.localeCompare(b.spot),
            width: 150
        }
    ];

    return (
        <>
            <ApplicationBar title={i18n.t('general.shootArounds')} showDrawerToggle />
            <LoadingWrapper isLoading={isLoading}>
                <Table<IShootAroundListRow>
                    columns={columns}
                    rows={rows}
                    rowDelete={{
                        dialogTitle: i18n.t('screens.shootArounds.deleteConfirmation'),
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