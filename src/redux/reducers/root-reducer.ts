import { combineReducers } from 'redux';
import applicationReducer from './application/application-reducer';

const rootReducer = combineReducers({
    application: applicationReducer
});

export default rootReducer;