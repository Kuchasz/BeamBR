import {render} from "preact";
import {Main} from "./root/components/root";
import * as React from 'preact';
import * as main from './root/reducer';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'preact-redux';
import thunk from 'redux-thunk';
import {createFetchSensorsAction} from "./sensors/actions";
import {createFetchAlarmsAction} from "./alarms/actions";

const store = createStore(
    main.reducer,
    applyMiddleware(thunk));

store.dispatch(createFetchSensorsAction());
store.dispatch(createFetchAlarmsAction());

render(
    <Provider store={store}>
        <Main/>
    </Provider>
    , document.body
);