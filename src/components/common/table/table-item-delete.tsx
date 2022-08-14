import React, {useState} from 'react';
import colors from '../../../colors';
import {Dialog, IconButton, Portal} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Button from '../button/button';

interface ITableItemDelete {
    dialogTitle: string;
    onDelete: () => void;
}

const TableItemDelete = (props: ITableItemDelete) => {
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);

    const handleDelete = () => {
        props.onDelete();
        setDialogVisible(false);
    };

    return (
        <>
            <IconButton
                icon='delete'
                iconColor={colors.primaryColor}
                size={20}
                onPress={() => setDialogVisible(true)} />
            <Portal>
                <Dialog
                    style={styles.deleteDialogStyle}
                    visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title style={styles.whiteText}>
                        {props.dialogTitle}
                    </Dialog.Title>
                    <View style={styles.actionButtonsContainer}>
                        <Button
                            label='Cancel'
                            type='default'
                            onPress={() => setDialogVisible(false)} />
                        <Button
                            label='Delete'
                            type='primary'
                            onPress={handleDelete} />
                    </View>
                </Dialog>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    deleteDialogStyle: {
        backgroundColor: colors.white
    },
    whiteText: {
        color: colors.primaryColor
    },
    actionButtonsContainer: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default TableItemDelete;