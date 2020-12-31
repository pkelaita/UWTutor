import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './store';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

ReactDOM.render(
    <Provider store={store()}>
        <App />
    </Provider>,
    document.getElementById('root')
);
