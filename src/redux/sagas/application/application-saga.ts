import { takeLatest, select, put } from 'redux-saga/effects';
import {RootState} from '../../store/store';
import {
    applicationMounted,
    initializeApplication
} from '../../reducers/application/application-reducer';

export function* applicationMountedWatcherSaga() {
    yield takeLatest([applicationMounted.type], applicationMountedSaga);
}

function* applicationMountedSaga() {
    const applicationInitialized: boolean = yield select((state: RootState) => state.application.applicationInitialized);

    if (!applicationInitialized) {
        yield put(initializeApplication());
    }
}
