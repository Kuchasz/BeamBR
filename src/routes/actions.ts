import {Route} from "./state";

export type NavigateToRouteActionType = 'navigateToRouteActionType';
export const NavigateToRouteActionType = 'navigateToRouteActionType';

interface NavigateToRouteAction{
    type: NavigateToRouteActionType;
    route: Route
}

export const createNavigateToRouteAction = (route: Route) => ({
    type: NavigateToRouteActionType,
    route
});

export type Actions = NavigateToRouteAction;