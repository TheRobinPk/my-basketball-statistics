import { combineReducers } from 'redux';
import applicationReducer from './application/application-reducer';
import addShootAroundReducer from './add-shootaround/add-shootaround-reducer';

const rootReducer = combineReducers({
    application: applicationReducer,
    addShootAround: addShootAroundReducer,
});

export default rootReducer;