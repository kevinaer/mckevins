import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import menuApi from 'reducers/api/MenuReducers';
import loginApi from 'reducers/api/LoginReducers';
import Routes from 'routes';
import registerServiceWorker from './registerServiceWorker';

const rootReducers = combineReducers({ menuApi, loginApi });
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
