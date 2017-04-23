import { render } from "preact";
import {Main} from "./components/main";
import * as React from 'preact';
import {createStore} from 'redux';
import {reducer} from './routes/reducer';
import {Provider} from 'preact-redux';

const store = createStore(reducer);

render(
    <Provider store={store}>
        <Main/>
    </Provider>
    ,document.body
);