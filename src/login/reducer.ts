import {Actions, LogoutActionType, StoreUserProfileActionType} from "./actions";
import {State} from "./state";

const initialState: State = {
    login: undefined,
    token: undefined
};

export const reducer = (state = initialState, action: Actions): State => {
    switch (action.type) {
        case LogoutActionType:
            return {...initialState};
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