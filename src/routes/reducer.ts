import {Route, State} from "./state";
import {Actions, NavigateToRouteActionType} from "./actions";

const initialState = {
    currentRoute: Route.LoginForm
};

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case NavigateToRouteActionType:
            return {
                ...state,
                currentRoute: action.route,
            };
        default:
            return state;
    }
};