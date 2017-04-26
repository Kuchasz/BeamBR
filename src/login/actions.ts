import {getAuthToken} from "./apis";
export type LoginActionType = 'loginActionType';
export const LoginActionType = 'loginActionType';

export type LogoutActionType = 'logoutActionType';
export const LogoutActionType = 'logoutActionType';

export type StoreUserProfileActionType = 'storeUserProfileActionType';
export const StoreUserProfileActionType = 'storeUserProfileActionType';

export interface LoginAction {
    type: LoginActionType,
    login: string,
    password: string
}

export interface LogoutAction {
    type: LogoutActionType
}

export interface StoreUserProfileAction{
    type: StoreUserProfileActionType,
    login: string,
    token: string
}

export const createLoginAction = (login, password) => (dispatch, getState) => {
    getAuthToken(login, password)
        .then(token => dispatch(createStoreUserProfileAction(login, token)))
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

export type LoginActions = LoginAction | LogoutAction | StoreUserProfileAction;