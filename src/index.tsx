import { render } from "preact";
import {Main} from "./main/components/main";
import * as React from 'preact';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as routesReducer} from './routes/reducer';
import {reducer as loginReducer} from './login/reducer';
import {reducer as networkingReducer} from './networking/reducer';
import {Provider} from 'preact-redux';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        login: loginReducer,
        routes: routesReducer,
        networking: networkingReducer
    }),
    applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Main/>
    </Provider>
    ,document.body
);