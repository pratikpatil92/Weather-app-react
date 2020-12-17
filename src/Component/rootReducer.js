import {combineReducers} from 'redux';
import weatherReducer from './Redux/weather/weatherReducer';

export default combineReducers(
    {
        weather:weatherReducer,
    }
);