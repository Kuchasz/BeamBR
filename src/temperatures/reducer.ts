import {Temperature} from "./state";
import {Actions, StoreTemperaturesActionType} from "./actions";

const initialState = [];

export const reducer = (state: Temperature[] = initialState, action: Actions) => {
    switch (action.type) {
        case StoreTemperaturesActionType:
            return [...state, ...action.temperatures];
        default:
            return state;
    }
};

export const getLastTemp = (state: Temperature[], sensorId: string) => {
    const tempsForSensor = state.filter(t => t.sensorId === sensorId);
    return tempsForSensor[tempsForSensor.length - 1];
};