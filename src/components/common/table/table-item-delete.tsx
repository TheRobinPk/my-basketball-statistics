import React, {useState} from 'react';
import colors from '../../../colors';
import {Dialog, IconButton, Portal} from 'react-native-paper';
import {StyleSheet} from 'react-native';
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
                    <Dialog.Actions>
                        <Button
                            label='Cancel'
                            testID='shoot-around-delete-dialog-cancel-button'
                            labelTestID='shoot-around-delete-dialog-cancel-button-label'
                            onPress={() => setDialogVisible(false)} />
                        <Button
                            label='Delete'
                            testID='shoot-around-delete-dialog-delete-button'
                            labelTestID='shoot-around-delete-dialog-delete-button-label'
                            onPress={handleDelete} />
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    deleteDialogStyle: {
        backgroundColor: colors.primaryColor
    },
    whiteText: {
        color: colors.white
    }
});

export default TableItemDelete;