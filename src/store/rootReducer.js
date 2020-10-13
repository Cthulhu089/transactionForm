import { combineReducers } from 'redux';
import pokeReducer from '../reducers/pokeListReducer';
import pokeInfoReducer from '../reducers/pokeInfoReducer';
import { routerReducer } from "react-router-redux";

export default combineReducers({
    pokeReducer,
    pokeInfoReducer,
    routing: routerReducer,
});