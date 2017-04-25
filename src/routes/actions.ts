import {Route} from "./model";

export const ActionTypes = {
    NAVIGATE: "NAVIGATE"
};

export const navigateToRoute = (route: Route) => ({
    type: ActionTypes.NAVIGATE,
    route
});

export const asyncNavigateToRoute = (route: Route) => (dispatch, getState) => {
    setTimeout(()=>{
        dispatch(navigateToRoute(route));
    }, 1500);
};