import {LoginActions, LoginActionType, LogoutActionType} from "./actions";
const defaultState = {
    login: undefined,
    token: undefined
};

export const reducer = (state = defaultState, action: LoginActions) => {
    switch (action.type) {
        case LoginActionType:
            console.log(action.type, action.login, action.password);
            return state;
        case LogoutActionType:
            console.log(action.type);
            return state;
        default:
            return state;
    }
};