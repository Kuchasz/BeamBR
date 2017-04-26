import { render } from "preact";
import {Main} from "./main/components/main";
import * as React from 'preact';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import * as routes from './routes/reducer';
import * as login from './login/reducer';
import * as networking from './networking/reducer';
import {Provider} from 'preact-redux';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        login: login.reducer,
        routes: routes.reducer,
        networking: networking.reducer
    }),
    applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Main/>
    </Provider>
    ,document.body
);