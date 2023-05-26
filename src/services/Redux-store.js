import { combineReducers, createStore } from 'redux';
import { botChangeReducer } from './Reducer';

let reducers = combineReducers({
  Bots: botChangeReducer,
});

let store = createStore(reducers);

export default store;
