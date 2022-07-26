import {put, select, takeLatest} from 'redux-saga/effects';
import ShootAroundService, {ShootAroundAggregatedResult} from '../../../service/shoot-around-service';
import {RootState} from '../../store/store';
import {
    setDashboardChartData,
    setDashboardIsLoading,
    setDashboardSelectedFilterSpots,
    setDashboardSelectedRange,
} from '../../reducers/dashboard/dashboard-reducer';
import {ShootAroundSpot} from '../../../domain/shoot-around';
import {DateRange} from '../../../components/common/date-time-range-picker/date-range-picker';
import {shootAroundSubmitSuccess} from '../../reducers/add-shootaround/add-shootaround-reducer';
import ShootAroundChartService, {ShootAroundChartData} from '../../../service/shoot-around-chart-service';

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
    const shootAroundChartService: ShootAroundChartService | undefined = yield select((state: RootState) => state.application.shootAroundChartService);
    const selectedRange: DateRange = yield select((state: RootState) => state.dashboard.selectedRange);
    const selectedFilterSpots: ShootAroundSpot[] = yield select((state: RootState) => state.dashboard.selectedFilterSpots);

    const { start, end } = selectedRange;
    const aggregatedValues: ShootAroundAggregatedResult[] = yield shootAroundService?.findAggregatedBy(start, end, selectedFilterSpots);
    const chartData: ShootAroundChartData = yield shootAroundChartService?.calculateShootAroundChartData(aggregatedValues, 'week', selectedRange);

    yield put(setDashboardChartData(chartData));
    yield put(setDashboardIsLoading(false));
}