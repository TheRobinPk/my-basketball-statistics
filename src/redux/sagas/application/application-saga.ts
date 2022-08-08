import {call, put, select, takeLatest} from 'redux-saga/effects';
import {RootState} from '../../store/store';
import {
    applicationMounted,
    initializeApplication
} from '../../reducers/application/application-reducer';
import { DataSource } from 'typeorm';
import {ShootAroundEntity} from '../../../domain/shoot-around';
import {createConnection} from 'typeorm';
import {CreateShootAroundTable1657877900861} from '../../../migartions/create-shootaround-table1657877900861';
import {CreateShootAroundTableIndex1658570828462} from '../../../migartions/create-shootaround-table-index1658570828462';
import ENV from '../../../environmnent.config';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([applicationMounted.type], applicationMountedSaga);
}

function* applicationMountedSaga() {
    const applicationInitialized: boolean = yield select((state: RootState) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        const dataSource: DataSource = yield call(createConnection, {
            type: 'expo',
            database: ENV.DATABASE_NAME,
            driver: require('expo-sqlite'),
            entities: [ShootAroundEntity],
            migrationsRun: true,
            migrations: [
                CreateShootAroundTable1657877900861,
                CreateShootAroundTableIndex1658570828462
            ],
            logging: ENV.SHOULD_LOG_SQL
        });

        yield put(initializeApplication(dataSource));
    }
}
