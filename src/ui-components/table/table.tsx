import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Card, DataTable, Text} from 'react-native-paper';
import TableItemDelete from './table-item-delete';
import EmptyState from '../empty-state/empty-state';
import i18n from '../../i18n/i18n';
import colors from '../../static/colors';

export interface ITableKey {
    key: string;
}

export interface ITableColumn<T> {
    key: string;
    dataKey?: string;
    title: string;
    width: number;
    sortFunction?: (a: T, b: T) => number;
    renderColumn?: (row: T) => React.ReactNode;
}

export interface ITableDeleteProps<T> {
    dialogTitle: string;
    onDelete: (row: T) => void;
}

export interface ITablePaginationProps {
    pageSize: number;
}

export interface ITableProps<T> {
    columns: ITableColumn<T>[];
    rows: T[];
    rowDelete?: ITableDeleteProps<T>;
    pagination?: ITablePaginationProps;
}

type SortDirection = 'ascending' | 'descending';

interface ISort {
    sortBy: string;
    sortDirection: SortDirection;
}

const Table = <T extends ITableKey>(props: ITableProps<T>) => {
    const [currentPage, setCurrentPage] = useState<number>(1); // starting from 1, like what we'd like to display
    const [sort, setSort] = useState<ISort | undefined>(undefined);
    const { rows, columns, rowDelete, pagination } = props;

    if (rows.length === 0) {
        return (
            <EmptyState />
        );
    }

    const getCurrentPageData = (): T[] => {
        let result = [...rows];
        if (sort) {
            const sortByColumn = columns.find((column) => column.dataKey === sort.sortBy);
            const sortFunction = sortByColumn?.sortFunction;
            if (sortFunction) {
                result = result.sort((a, b) => {
                    const sortResult = sortFunction(a, b);
                    return sort.sortDirection === 'ascending' ? sortResult : sortResult * -1;
                });
            }
        }
        if (pagination !== undefined) {
            result = result.slice((currentPage - 1) * pagination.pageSize, currentPage * pagination.pageSize);
        }
        return result;
    };

    const handleSort = (sortBy: string | undefined) => {
        if (sortBy) {
            let sortDirection: SortDirection = 'ascending';
            if (sortBy === sort?.sortBy && sort?.sortDirection === 'ascending') {
                sortDirection = 'descending';
            }
            setSort({
                sortBy: sortBy,
                sortDirection: sortDirection
            });
        }
    };

    const renderColumnHeader = (column: ITableColumn<T>) => {
        return (
            <DataTable.Title
                key={column.key}
                style={styles.columnHeaderStyle}
                sortDirection={sort?.sortBy === column.dataKey ? sort?.sortDirection : undefined}
                onPress={column.sortFunction ? () => handleSort(column.dataKey) : undefined}>
                <View style={{ width: column.width }}>
                    <Text style={styles.columnHeaderTextStyle}>
                        {column.title}
                    </Text>
                </View>
            </DataTable.Title>
        );
    };

    const renderRow = (columns: ITableColumn<T>[], row: T) => {
        return (
            <DataTable.Row key={row.key}>
                {columns.map((column) => {
                    return (
                        <DataTable.Cell
                            key={column.key}
                            style={styles.cellStyle}>
                            {renderCell(column, row)}
                        </DataTable.Cell>
                    );
                })}
            </DataTable.Row>
        );
    };

    const renderCell = (column: ITableColumn<T>, row: T) => {
        let toRender = null;
        if (column.dataKey !== undefined) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const textContent = row[column.dataKey];
            toRender = (
                <Text style={styles.cellTextStyle}>
                    {textContent}
                </Text>
            );
        } else if (column.renderColumn !== undefined) {
            toRender = column.renderColumn(row);
        }
        return (
            <View style={{ width: column.width + 20 }}>
                {toRender}
            </View>
        );
    };

    const columnsToRender = [...columns];
    const rowsToRender = getCurrentPageData();

    if (rowDelete !== undefined) {
        columnsToRender.unshift({
            key: 'actions',
            title: i18n.t('general.actions'),
            width: 50,
            renderColumn: (row: T) => {
                return (
                    <TableItemDelete
                        dialogTitle={rowDelete.dialogTitle}
                        onDelete={() => rowDelete.onDelete(row)} />
                );
            }
        });
    }

    const from = ((currentPage - 1) * (pagination?.pageSize || 1)) + 1;
    const to = Math.min(currentPage * (pagination?.pageSize || 1), rows.length);

    return (
        <View style={styles.cardStyle}>
            <Card mode='elevated' elevation={5}>
                <Card.Content>
                    <ScrollView
                        style={styles.horizontalScrollViewStyle}
                        horizontal
                        showsHorizontalScrollIndicator
                        persistentScrollbar
                        indicatorStyle='black'>
                        <DataTable>
                            <DataTable.Header>
                                {columnsToRender.map((column) => {
                                    return renderColumnHeader(column);
                                })}
                            </DataTable.Header>
                            <ScrollView
                                style={{ maxHeight: Dimensions.get('window').height * 2/3 }}
                                persistentScrollbar
                                showsVerticalScrollIndicator>
                                {rowsToRender.map((row) => {
                                    return renderRow(columnsToRender, row);
                                })}
                            </ScrollView>
                        </DataTable>
                    </ScrollView>
                </Card.Content>
                {pagination !== undefined ? (
                    <Card.Actions>
                        <DataTable.Pagination
                            page={currentPage - 1}
                            numberOfPages={Math.ceil(rows.length / pagination.pageSize)}
                            onPageChange={(page) => setCurrentPage(page + 1)}
                            label={i18n.t('general.paginationLabel', { from: from, to: to, count: rows.length })} />
                    </Card.Actions>
                ) : null}
            </Card>
        </View>
    );
};


const styles = StyleSheet.create({
    cardStyle: {
        margin: 8
    },
    horizontalScrollViewStyle: {
        paddingBottom: 4
    },
    columnHeaderStyle: {
        marginRight: 8
    },
    columnHeaderTextStyle: {
        fontWeight: '700',
        fontSize: 12,
        flexWrap: 'nowrap',
        color: colors.primaryColor
    },
    cellStyle: {
        paddingLeft: 8,
        paddingRight: 8
    },
    cellTextStyle: {
        fontSize: 12,
        color: colors.darkerGrey,
        fontWeight: '500'
    }
});

export default Table;