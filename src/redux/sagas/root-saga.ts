import { all } from 'redux-saga/effects';
import {applicationMountedWatcherSaga} from './application/application-saga';
import {getDashboardChartDataWatcherSaga} from './dashboard/dashboard-saga';

export default function* rootSaga() {
    yield all([
        applicationMountedWatcherSaga(),
        getDashboardChartDataWatcherSaga()
    ]);
}