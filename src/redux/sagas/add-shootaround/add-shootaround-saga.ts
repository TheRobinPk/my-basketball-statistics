import {put, select, takeLatest} from 'redux-saga/effects';
import {RootState} from '../../store/store';
import {
    resetShootAroundForm,
    setAddShootAroundIsLoading, setAddShootAroundSubmitSuccess,
    submitShootAround
} from '../../reducers/add-shootaround/add-shootaround-reducer';
import {ShootAround, ShootAroundSpot} from '../../../domain/shoot-around';
import moment from 'moment';
import ShootAroundService from '../../../service/shoot-around-service';

export function* submitShootAroundWatcherSaga() {
    yield takeLatest([submitShootAround.type], submitShootAroundSaga);
}

function* submitShootAroundSaga() {
    yield put(setAddShootAroundIsLoading(true));

    const shootAroundService: ShootAroundService | undefined = yield select((state: RootState) => state.application.shootAroundService);
    const totalAttempts: string = yield select((state: RootState) => state.addShootAround.totalAttempts);
    const madeAttempts: string = yield select((state: RootState) => state.addShootAround.madeAttempts);
    const submitDisabled: boolean = yield select((state: RootState) => state.addShootAround.submitDisabled);

    if (!submitDisabled) {
        const shootAround: ShootAround = {
            totalAttempts: parseInt(totalAttempts),
            madeAttempts: parseInt(madeAttempts),
            spot: ShootAroundSpot.FREE_THROW, // TODO
            dateTime: moment.utc()
        };

        yield shootAroundService?.insert(shootAround);
        yield put(resetShootAroundForm());
        yield put(setAddShootAroundSubmitSuccess(true));
    }
}