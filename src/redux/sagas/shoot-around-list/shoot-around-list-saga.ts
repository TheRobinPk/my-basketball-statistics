import {put, select, takeLatest} from 'redux-saga/effects';
import {getShootAroundListData, setShootAroundListData, setShootAroundListIsLoading} from '../../reducers/shoot-around-list/shoot-around-list-reducer';
import ShootAroundService from '../../../service/shoot-around-service';
import {RootState} from '../../store/store';
import {ShootAround} from '../../../domain/shoot-around';
import {shootAroundSubmitSuccess} from '../../reducers/add-shoot-around/add-shoot-around-reducer';

export function* getShootAroundListDataWatcherSaga() {
    yield takeLatest([
        getShootAroundListData.type,
        shootAroundSubmitSuccess.type
    ], getShootAroundListDataSaga);
}

function* getShootAroundListDataSaga() {
    yield put(setShootAroundListIsLoading(true));

    const shootAroundService: ShootAroundService | undefined = yield select((state: RootState) => state.application.shootAroundService);
    const shootAroundList: ShootAround[] = yield shootAroundService?.findAll();

    yield put(setShootAroundListData(shootAroundList));
    yield put(setShootAroundListIsLoading(false));
}