import {ActionTypes} from './actions';
import {Route} from "./state";

const initialState = {
    currentRoute: Route.LoginForm
};

export const reducer = (state = initialState, action) => {
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