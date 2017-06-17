import {Actions, LogoutActionType, StoreUserProfileActionType} from "./actions";

const initialState = {
    login: undefined,
    token: undefined
};

console.warn('Login - reducer missing state typings');

export const reducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case LogoutActionType:
            return state;
        case StoreUserProfileActionType:
            return {
                ...state,
                login: action.login,
                token: action.token
            };
        default:
            return state;
    }
};