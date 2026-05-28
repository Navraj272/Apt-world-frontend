/* eslint-disable no-undef */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import withRedux from '../components/withRedux';


const enhancers = [];

const middleware = [thunk];

const composeWithDevTools = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    && (process.env.NODE_ENV === 'development'
        || localStorage.getItem('jdgfajf7231648')) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers,
);

const createWithStore = (reducers, config) => withRedux((initialState = {}) => {
    const rootReducer = combineReducers({ ...reducers });
    return createStore(rootReducer, initialState, composedEnhancers);
}, config);

export default createWithStore;
