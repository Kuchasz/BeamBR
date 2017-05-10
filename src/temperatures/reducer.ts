import {State} from "./state";
import {Actions, StoreTemperaturesActionType} from "./actions";

const initialState = [];

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case StoreTemperaturesActionType:
            return [...state, ...action.temperatures];
        default:
            return state;
    }
};