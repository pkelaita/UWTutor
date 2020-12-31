import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers.js';

// use thunk middleware for actions involving asynchronous API calls
const middlewares = [thunk];

// use redux logger, if possible
if (ExecutionEnvironment.canUseDOM)
    middlewares.push(createLogger({
        level: 'info',
        duration: true,
        collapsed: true,
    }));

// if we are in dev, use redux dev tools
const composeCustom = (process.env.NODE_ENV === "development")
    ? composeWithDevTools
    : compose;

export default initialState => {
    return createStore(
        reducers,
        initialState,
        composeCustom(applyMiddleware(...middlewares)),
    );
}