import {createStore, applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

/* Application middlewares, in this case only use a thunk middleware*/
const middlewares = [thunk];

/* Redux store*/
export const store = createStore(rootReducer, applyMiddleware(...middlewares)); 