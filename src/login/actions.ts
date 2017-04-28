import {getAuthToken} from "./apis";
import {createNavigateToRouteAction} from "../routes/actions";
import {Route} from "../routes/state";

export type LoginActionType = 'loginActionType';
export const LoginActionType = 'loginActionType';

export type LogoutActionType = 'logoutActionType';
export const LogoutActionType = 'logoutActionType';

export type StoreUserProfileActionType = 'storeUserProfileActionType';
export const StoreUserProfileActionType = 'storeUserProfileActionType';

interface LoginAction {
    type: LoginActionType,
    login: string,
    password: string
}

interface LogoutAction {
    type: LogoutActionType
}

interface StoreUserProfileAction{
    type: StoreUserProfileActionType,
    login: string,
    token: string
}

export const createLoginAction = (login, password) => (dispatch) => {
    getAuthToken(login, password)
        .then(token => {
            dispatch(createStoreUserProfileAction(login, token));
            dispatch(createNavigateToRouteAction(Route.Dashboard))
        })
        .catch(()=>console.log(`Argh! Failure...`));
};

export const createLogoutAction = () => ({
    type: LogoutActionType
});

export const createStoreUserProfileAction = (login, token) => ({
    type: StoreUserProfileActionType,
    login,
    token
});

export type Actions = LoginAction | LogoutAction | StoreUserProfileAction;