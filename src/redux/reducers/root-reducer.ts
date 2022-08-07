import { combineReducers } from 'redux';
import applicationReducer from './application/application-reducer';
import addShootAroundReducer from './add-shootaround/add-shootaround-reducer';
import dashboardReducer from './dashboard/dashboard-reducer';
import shootAroundListReducer from './shootaround-list/shootaround-list-reducer';

const rootReducer = combineReducers({
    application: applicationReducer,
    addShootAround: addShootAroundReducer,
    dashboard: dashboardReducer,
    shootAroundList: shootAroundListReducer
});

export default rootReducer;