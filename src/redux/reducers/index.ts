import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messageReducer  from './messageReducer';

export default combineReducers({ msg: messageReducer, routing: routerReducer });