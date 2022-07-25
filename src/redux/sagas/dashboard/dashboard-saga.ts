import {put, select, takeLatest} from 'redux-saga/effects';
import ShootAroundService from '../../../service/shoot-around-service';
import {RootState} from '../../store/store';
import {
    setDashboardAggregatedValues,
    setDashboardIsLoading,
    setDashboardSelectedFilterSpots,
    setDashboardSelectedRange,
    ShootAroundAggregatedResult
} from '../../reducers/dashboard/dashboard-reducer';
import {ShootAroundSpot} from '../../../domain/shoot-around';
import {DateRange} from '../../../components/common/date-time-range-picker/date-range-picker';
import {shootAroundSubmitSuccess} from '../../reducers/add-shootaround/add-shootaround-reducer';

export function* dashboardDateRangeChangedWatcherSaga() {
    yield takeLatest([
        setDashboardSelectedRange.type,
        setDashboardSelectedFilterSpots.type,
        shootAroundSubmitSuccess.type
    ], dashboardDateRangeChangedSaga);
}

function* dashboardDateRangeChangedSaga() {
    yield put(setDashboardIsLoading(true));

    const shootAroundService: ShootAroundService | undefined = yield select((state: RootState) => state.application.shootAroundService);
    const selectedRange: DateRange = yield select((state: RootState) => state.dashboard.selectedRange);
    const selectedFilterSpots: ShootAroundSpot[] = yield select((state: RootState) => state.dashboard.selectedFilterSpots);

    const { start, end } = selectedRange;
    const aggregatedValues: ShootAroundAggregatedResult[] = yield shootAroundService?.findAggregatedBy(start, end, selectedFilterSpots);

    yield put(setDashboardAggregatedValues(aggregatedValues));
    yield put(setDashboardIsLoading(false));
}