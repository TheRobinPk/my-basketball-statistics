import {put, select, takeLatest} from 'redux-saga/effects';
import ShootAroundService from '../../../service/shoot-around-service';
import {RootState} from '../../store/store';
import {
    setDashboardIsLoading,
    setDashboardDateRange,
    setDashboardDataAggregationType,
    setDashboardShootAroundSpots,
    setDashboardChartData,
    ShootAroundChartData, DataAggregationType,
} from '../../reducers/dashboard/dashboard-reducer';
import {ShootAround, ShootAroundSpot} from '../../../domain/shoot-around';
import {shootAroundSubmitSuccess} from '../../reducers/add-shoot-around/add-shoot-around-reducer';
import ShootAroundChartService from '../../../service/shoot-around-chart-service';
import {DateRange} from '../../../components/common/date-picker/date-range-picker';

export function* dashboardDateRangeChangedWatcherSaga() {
    yield takeLatest([
        setDashboardDateRange.type,
        setDashboardDataAggregationType.type,
        setDashboardShootAroundSpots.type,
        shootAroundSubmitSuccess.type
    ], dashboardDateRangeChangedSaga);
}

function* dashboardDateRangeChangedSaga() {
    yield put(setDashboardIsLoading(true));

    const shootAroundService: ShootAroundService | undefined = yield select((state: RootState) => state.application.shootAroundService);
    const shootAroundChartService: ShootAroundChartService | undefined = yield select((state: RootState) => state.application.shootAroundChartService);
    const dateRange: DateRange = yield select((state: RootState) => state.dashboard.dateRange);
    const dataAggregationType: DataAggregationType | undefined = yield select((state: RootState) => state.dashboard.dataAggregationType);
    const shootAroundSpots: ShootAroundSpot[] = yield select((state: RootState) => state.dashboard.shootAroundSpots);
    const { start, end } = dateRange;

    const shootArounds: ShootAround[] = yield shootAroundService?.findBetweenAndWithinSpotsByDays(start, end, shootAroundSpots);
    const chartData: ShootAroundChartData = yield shootAroundChartService?.calculateShootAroundChartData(shootArounds, dataAggregationType, dateRange);

    yield put(setDashboardChartData(chartData));
    yield put(setDashboardIsLoading(false));
}