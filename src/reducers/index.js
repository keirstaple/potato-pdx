import { combineReducers } from 'redux';
import dataReducer from './reducer_data';

const rootReducer = combineReducers({
  videos: dataReducer
});

export default rootReducer;
