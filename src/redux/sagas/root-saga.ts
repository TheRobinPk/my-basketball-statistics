import { all } from 'redux-saga/effects';
import {applicationMountedWatcherSaga} from './application/application-saga';
import {submitShootAroundWatcherSaga} from './add-shoot-around/add-shoot-around-saga';
import {dashboardDateRangeChangedWatcherSaga} from './dashboard/dashboard-saga';
import {deleteShootAroundWatcherSaga, getShootAroundListDataWatcherSaga} from './shoot-around-list/shoot-around-list-saga';

export default function* rootSaga() {
    yield all([
        applicationMountedWatcherSaga(),
        submitShootAroundWatcherSaga(),
        dashboardDateRangeChangedWatcherSaga(),
        getShootAroundListDataWatcherSaga(),
        deleteShootAroundWatcherSaga()
    ]);
}