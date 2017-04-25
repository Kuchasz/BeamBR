export type LoginActionType = 'loginActionType';
export const LoginActionType = 'loginActionType';

export type LogoutActionType = 'logoutActionType';
export const LogoutActionType = 'logoutActionType';

export interface LoginAction {
    type: LoginActionType,
    login: string,
    password: string
}

export interface LogoutAction {
    type: LogoutActionType
}

export const createLoginAction = (login, password) => ({
    type: LoginActionType,
    login,
    password
});

export const createLogoutAction = () => ({
    type: LogoutActionType
});

export type LoginActions = LoginAction | LogoutAction;