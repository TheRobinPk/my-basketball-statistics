import React from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../../colors';

export interface ITableKey {
    key: string;
}

export interface ITableColumn<T> {
    key: string;
    dataKey?: string;
    title: string;
    width: number;
    renderColumn?: (row: T) => React.ReactNode;
}

export interface ITableProps<T> {
    columns: ITableColumn<T>[];
    rows: T[]
}

const Table = <T extends ITableKey>(props: ITableProps<T>) => {
    const { columns, rows } = props;

    const renderColumnHeader = (column: ITableColumn<T>) => {
        return (
            <DataTable.Title
                key={column.key}
                style={styles.columnHeaderStyle}>
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
            <View style={{ width: column.width }}>
                {toRender}
            </View>
        );
    };

    return (
        <ScrollView
            style={styles.horizontalScrollViewStyle}
            horizontal
            showsHorizontalScrollIndicator
            persistentScrollbar
            indicatorStyle='black'>
            <ScrollView
                persistentScrollbar
                indicatorStyle='black'>
                <DataTable>
                    <DataTable.Header>
                        {columns.map((column) => {
                            return renderColumnHeader(column);
                        })}
                    </DataTable.Header>
                    {rows.map((row) => {
                        return renderRow(columns, row);
                    })}
                </DataTable>
            </ScrollView>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    horizontalScrollViewStyle: {
        paddingBottom: 4
    },
    columnHeaderStyle: {
        marginLeft: 8,
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
        fontSize: 12
    }
});

export default Table;