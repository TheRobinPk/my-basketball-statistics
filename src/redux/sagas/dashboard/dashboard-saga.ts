import {put, select, takeLatest} from 'redux-saga/effects';
import ShootAroundService from '../../../service/shoot-around-service';
import {RootState} from '../../store/store';
import {
    setDashboardIsLoading,
    setDashboardChartData,
    ShootAroundChartData, DataAggregationType, getDashboardChartData, initDashboard,
} from '../../reducers/dashboard/dashboard-reducer';
import {ShootAround, ShootAroundSpot} from '../../../domain/shoot-around';
import ShootAroundChartService from '../../../service/shoot-around-chart-service';
import {DateRange} from '../../../components/common/date-picker/date-range-picker';

export function* getDashboardChartDataWatcherSaga() {
    yield takeLatest([
        initDashboard.type,
        getDashboardChartData.type
    ], getDashboardChartDataSaga);
}

function* getDashboardChartDataSaga() {
    yield put(setDashboardIsLoading(true));

    const shootAroundService: ShootAroundService | undefined = yield select((state: RootState) => state.application.shootAroundService);
    const shootAroundChartService: ShootAroundChartService | undefined = yield select((state: RootState) => state.application.shootAroundChartService);
    const dateRange: DateRange = yield select((state: RootState) => state.dashboard.dateRange);
    const dataAggregationType: DataAggregationType | undefined = yield select((state: RootState) => state.dashboard.dataAggregationType);
    const shootAroundSpots: ShootAroundSpot[] = yield select((state: RootState) => state.dashboard.shootAroundSpots);
    const { start, end } = dateRange;

    const shootArounds: ShootAround[] = yield shootAroundService?.findBetweenAndWithinSpots(start, end, shootAroundSpots);
    const chartData: ShootAroundChartData = yield shootAroundChartService?.calculateShootAroundChartData(shootArounds, dataAggregationType, dateRange);

    yield put(setDashboardChartData(chartData));
    yield put(setDashboardIsLoading(false));
}