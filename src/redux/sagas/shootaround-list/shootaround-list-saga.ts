import {put, select, takeLatest} from 'redux-saga/effects';
import {getShootAroundListData, setShootAroundListData, setShootAroundListIsLoading} from '../../reducers/shootaround-list/shootaround-list-reducer';
import ShootAroundService from '../../../service/shoot-around-service';
import {RootState} from '../../store/store';
import {ShootAround} from '../../../domain/shoot-around';
import {shootAroundSubmitSuccess} from '../../reducers/add-shootaround/add-shootaround-reducer';

export function* getShootAroundListDataWatcherSaga() {
    yield takeLatest([
        getShootAroundListData.type,
        shootAroundSubmitSuccess.type
    ], getShootAroundListDataSaga);
}

function* getShootAroundListDataSaga() {
    yield put(setShootAroundListIsLoading(true));

    const shootAroundService: ShootAroundService | undefined = yield select((state: RootState) => state.application.shootAroundService);
    const shootArounds: ShootAround[] = yield shootAroundService?.findAll();

    yield put(setShootAroundListData(shootArounds));
    yield put(setShootAroundListIsLoading(false));
}