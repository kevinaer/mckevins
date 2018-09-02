import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import usersApi from 'reducers/api/UsersReducers';
import menuApi from 'reducers/api/MenuReducers';
import menuItemApi from 'reducers/api/MenuItemReducers';
import loginApi from 'reducers/api/LoginReducers';
import orderApi from 'reducers/api/OrderReducers';
import ordersApi from 'reducers/api/OrdersReducers';
import Routes from 'routes';
import registerServiceWorker from './registerServiceWorker';

const rootReducers = combineReducers({ menuApi, loginApi, usersApi, menuItemApi, orderApi, ordersApi });
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root'),
);

registerServiceWorker();
