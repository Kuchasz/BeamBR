import { render } from "preact";
import {Main} from "./main/components/main";
import * as React from 'preact';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as routesReducer} from './routes/reducer';
import {reducer as loginReducer} from './login/reducer';
import * as networking from './networking/reducer';
import {Provider} from 'preact-redux';
import thunk from 'redux-thunk';

export const getIsSecured = (state, ssid: string) =>
    networking.getIsSecured(state.networking.networks, ssid);

const store = createStore(
    combineReducers({
        login: loginReducer,
        routes: routesReducer,
        networking: networking.reducer
    }),
    applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Main/>
    </Provider>
    ,document.body
);