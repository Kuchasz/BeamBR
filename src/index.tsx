import {render} from "preact";
import {Main} from "./main/components/main";
import * as React from 'preact';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import * as routes from './routes/reducer';
import * as login from './login/reducer';
import * as networking from './networking/reducer';
import * as sensors from './sensors/reducer';
import {Provider} from 'preact-redux';
import thunk from 'redux-thunk';

export const getNetwork = (state, id: string) =>
    networking.getNetwork(state.networking, id);

export const getCurrentNetwork = (state) =>
    networking.getCurrentNetwork(state.networking);

export const getNetworks = (state) =>
    networking.getNetworks(state.networking);

export const getSensors = (state) =>
    sensors.getSensors(state.sensors);

const store = createStore(
    combineReducers({
        login: login.reducer,
        routes: routes.reducer,
        networking: networking.reducer,
        sensors: sensors.reducer
    }),
    applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Main/>
    </Provider>
    , document.body
);