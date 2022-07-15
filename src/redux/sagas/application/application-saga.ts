import {call, put, select, takeLatest} from 'redux-saga/effects';
import {RootState} from '../../store/store';
import {
    applicationMounted,
    initializeApplication,
    setApplicationDataSource
} from '../../reducers/application/application-reducer';
import { DataSource } from 'typeorm';
import {ShootAroundEntity} from '../../../domain/shoot-around';
import {createConnection} from 'typeorm';
import {CreateShootAroundTable1657877900861} from '../../../migartions/create-shootaround-table1657877900861';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([applicationMounted.type], applicationMountedSaga);
}

function* applicationMountedSaga() {
    const applicationInitialized: boolean = yield select((state: RootState) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        const dataSource: DataSource = yield call(createConnection, {
            type: 'expo',
            database: 'app.db',
            driver: require('expo-sqlite'),
            entities: [ShootAroundEntity],
            migrationsRun: true,
            migrations: [CreateShootAroundTable1657877900861],
        });

        yield put(setApplicationDataSource(dataSource));
        yield put(initializeApplication());
    }
}
