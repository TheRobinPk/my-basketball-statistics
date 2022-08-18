import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dialog, IconButton, Portal} from 'react-native-paper';
import Button from '../button/button';
import colors from '../../static/colors';
import i18n from '../../i18n/i18n';

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
                            label={i18n.t('general.cancel')}
                            type='default'
                            testID='table-item-delete-cancel-button'
                            labelTestID='table-item-delete-cancel-button-text'
                            onPress={() => setDialogVisible(false)} />
                        <Button
                            label={i18n.t('general.delete')}
                            type='primary'
                            testID='table-item-delete-button'
                            labelTestID='table-item-delete-button-text'
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