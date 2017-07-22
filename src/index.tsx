import {render} from "preact";
import {Main} from "./root/components/root";
import * as React from 'preact';
import * as main from './root/reducer';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'preact-redux';
import thunk from 'redux-thunk';
import {createFetchSensorsAction} from "./sensors/actions";
import {createFetchAlarmsAction} from "./alarms/actions";
import {createChangeVisualizationConfigAction} from "./visualization/actions";
import {VisualizationConfig} from "./visualization/state";

const store = createStore(
    main.reducer,
    applyMiddleware(thunk));

store.dispatch(createFetchSensorsAction());
store.dispatch(createFetchAlarmsAction());

const visualizationConfigString: string= localStorage.getItem("visualization-config");
if(visualizationConfigString)store.dispatch(createChangeVisualizationConfigAction(JSON.parse(visualizationConfigString)));

render(
    <Provider store={store}>
        <Main/>
    </Provider>
    , document.body
);