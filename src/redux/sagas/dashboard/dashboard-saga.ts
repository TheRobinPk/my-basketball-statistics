import {put, select, takeLatest} from 'redux-saga/effects';
import ShootAroundService from '../../../service/shoot-around-service';
import {RootState} from '../../store/store';
import {setDashboardIsLoading, setDashboardSelectedRange, setDashboardShootArounds} from '../../reducers/dashboard/dashboard-reducer';
import {ShootAround} from '../../../domain/shoot-around';
import {DateRange} from '../../../components/common/date-time-range-picker/date-range-picker';
import {shootAroundSubmitSuccess} from '../../reducers/add-shootaround/add-shootaround-reducer';

export function* dashboardDateRangeChangedWatcherSaga() {
    yield takeLatest([
        setDashboardSelectedRange.type,
        shootAroundSubmitSuccess.type
    ], dashboardDateRangeChangedSaga);
}

function* dashboardDateRangeChangedSaga() {
    yield put(setDashboardIsLoading(true));

    const shootAroundService: ShootAroundService | undefined = yield select((state: RootState) => state.application.shootAroundService);
    const selectedRange: DateRange = yield select((state: RootState) => state.dashboard.selectedRange);

    const { start, end } = selectedRange;
    const shootArounds: ShootAround[] = yield shootAroundService?.findBetween(start, end);

    yield put(setDashboardShootArounds(shootArounds));
    yield put(setDashboardIsLoading(false));
}