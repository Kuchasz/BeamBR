import {Route, InnerRoute} from "./state";

export type NavigateToRouteActionType = 'navigateToRouteActionType';
export const NavigateToRouteActionType = 'navigateToRouteActionType';

export type NavigateToInnerRouteActionType = 'navigateToInnerRouteActionType';
export const NavigateToInnerRouteActionType = 'navigateToInnerRouteActionType';

interface NavigateToRouteAction{
    type: NavigateToRouteActionType;
    route: Route;
}

interface NavigateToInnerRouteAction{
    type: NavigateToInnerRouteActionType;
    route: InnerRoute;
}

export const createNavigateToRouteAction = (route: Route) => ({
    type: NavigateToRouteActionType,
    route
});

export const createNavigateToInnerRouteAction = (route: InnerRoute) => ({
    type: NavigateToInnerRouteActionType,
    route
});

export type Actions = NavigateToRouteAction | NavigateToInnerRouteAction;