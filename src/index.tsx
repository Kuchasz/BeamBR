import {render} from "preact";
import {Main} from "./main/components/main";
import * as React from 'preact';
import * as main from './main/reducer';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'preact-redux';
import thunk from 'redux-thunk';

const store = createStore(
    main.reducer,
    applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Main/>
    </Provider>
    , document.body
);