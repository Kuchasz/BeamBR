import {ActionTypes} from './actions';
import {Route} from "./model";

const defaultState = {
    currentRoute: Route.Dashboard
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.NAVIGATE:
            return {
                ...state,
                currentRoute: action.route,
            };
        default:
            return state;
    }
};