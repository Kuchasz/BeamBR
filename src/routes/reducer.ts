import {Route, State, InnerRoute} from "./state";
import {Actions, NavigateToRouteActionType, NavigateToInnerRouteActionType} from "./actions";

const initialState = {
    currentRoute: Route.AppPage,
    currentInnerRoute: InnerRoute.Visualization
};

export const reducer = (state: State = initialState, action: Actions): State => {
    switch (action.type) {
        case NavigateToRouteActionType:
            return {
                ...state,
                currentRoute: action.route,
            };
        case NavigateToInnerRouteActionType:
            return {
                ...state,
                currentInnerRoute: action.route,
            };
        default:
            return state;
    }
};

export const getInnerRoute = (state: State) =>
    state.currentInnerRoute;