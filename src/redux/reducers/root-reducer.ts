import { combineReducers } from 'redux';
import applicationReducer from './application/application-reducer';
import addShootAroundReducer from './add-shoot-around/add-shoot-around-reducer';
import dashboardReducer from './dashboard/dashboard-reducer';
import shootAroundListReducer from './shoot-around-list/shoot-around-list-reducer';

const rootReducer = combineReducers({
    application: applicationReducer,
    addShootAround: addShootAroundReducer,
    dashboard: dashboardReducer,
    shootAroundList: shootAroundListReducer
});

export default rootReducer;