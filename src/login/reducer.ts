import {Actions, LogoutActionType, StoreUserProfileActionType} from "./actions";
const defaultState = {
    login: undefined,
    token: undefined
};

export const reducer = (state = defaultState, action: Actions) => {
    switch (action.type) {
        case LogoutActionType:
            console.log(action.type);
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