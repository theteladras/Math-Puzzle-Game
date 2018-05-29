import { combineReducers } from 'redux';
import ProcesReducer from './ProcesReducer';


export default combineReducers({
    proces: ProcesReducer,
});