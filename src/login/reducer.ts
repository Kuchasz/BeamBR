import {LoginActions, LoginActionType, LogoutActionType, StoreUserProfileActionType} from "./actions";
const defaultState = {
    login: undefined,
    token: undefined
};

export const reducer = (state = defaultState, action: LoginActions) => {
    switch (action.type) {
        case LoginActionType:
            console.log('LoginAction!', action.type, action.login, action.password);
            return state;
        case LogoutActionType:
            console.log('LogoutAction!', action.type);
            return state;
        case StoreUserProfileActionType:
            return {
                login: action.login,
                token: action.token
            };
        default:
            return state;
    }
};