import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Component/rootReducer';

const middlerWare = [thunk];
const initialState = {}

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlerWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;

