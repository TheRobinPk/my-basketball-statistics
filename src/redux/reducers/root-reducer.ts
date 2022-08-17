import { combineReducers } from 'redux';
import applicationReducer from './application/application-reducer';
import dashboardReducer from './dashboard/dashboard-reducer';

const rootReducer = combineReducers({
    application: applicationReducer,
    dashboard: dashboardReducer
});

export default rootReducer;