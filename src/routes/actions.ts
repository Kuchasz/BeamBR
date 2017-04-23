import {Route} from "./model";

export const ActionTypes = {
    NAVIGATE: "NAVIGATE"
};

export const navigateToRoute = (route: Route) => ({
    type: ActionTypes.NAVIGATE,
    route
});