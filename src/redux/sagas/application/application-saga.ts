import { takeLatest, select, put, call } from 'redux-saga/effects';
import {RootState} from '../../store/store';
import {
    applicationMounted,
    initializeApplication, setApplicationDatabase
} from '../../reducers/application/application-reducer';
import * as SQLite from 'expo-sqlite';
import {Database} from 'expo-sqlite';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([applicationMounted.type], applicationMountedSaga);
}

function* applicationMountedSaga() {
    const applicationInitialized: boolean = yield select((state: RootState) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        const database: Database = yield call(SQLite.openDatabase, 'app_db', '1.0.0');
        yield put(setApplicationDatabase(database));
        yield put(initializeApplication());
    }
}
