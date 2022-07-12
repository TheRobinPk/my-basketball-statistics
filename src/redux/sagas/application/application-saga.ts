import {call, put, select, takeLatest} from 'redux-saga/effects';
import {RootState} from '../../store/store';
import {
    applicationMounted,
    initializeApplication,
    setApplicationDatabase
} from '../../reducers/application/application-reducer';
import * as SQLite from 'expo-sqlite';
import {WebSQLDatabase} from 'expo-sqlite';
import ShootAroundService from '../../../service/shoot-around-service';
import {ShootAround, ShootAroundSpot} from '../../../domain/shoot-around';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([applicationMounted.type], applicationMountedSaga);
}

function* applicationMountedSaga() {
    try {
        const applicationInitialized: boolean = yield select((state: RootState) => state.application.applicationInitialized);

        if (!applicationInitialized) {
            const database: WebSQLDatabase = yield call(SQLite.openDatabase, 'app_db', '1.0.0');
            yield call(ShootAroundService.initTable, database);
            const items: ShootAround[] = yield call(ShootAroundService.findAll, database);
            console.log('items: ', items);
            yield put(setApplicationDatabase(database));
            yield put(initializeApplication());
        }
    } catch (error) {
        console.log(error);
    }
}
