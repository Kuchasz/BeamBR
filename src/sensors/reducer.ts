import {State, Sensor} from "./state";
import {Actions, SetNameForSensorActionType, StoreSensorsActionType, SetColorForSensorActionType} from "./actions";

const initialState = {
    sensors: []
};

const sensorReducer = (state: Sensor, action: Actions) => {
    switch (action.type) {
        case SetNameForSensorActionType:
            return {...state, name: action.name};
        case SetColorForSensorActionType:
            return {...state, color: action.color};
        default:
            return state;
    }
};

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case SetNameForSensorActionType: {
            const sensorToRename = getSensorById(state, action.id);
            const sensorIndex = state.sensors.indexOf(sensorToRename);
            return {
                ...state, sensors: [
                    ...state.sensors.slice(0, sensorIndex),
                    sensorReducer(sensorToRename, action),
                    ...state.sensors.slice(sensorIndex + 1)]
            }
        };
        case SetColorForSensorActionType: {
            const sensorToChangeColor = getSensorById(state, action.id);
            const sensorIndex = state.sensors.indexOf(sensorToChangeColor);
            return {
                ...state, sensors: [
                    ...state.sensors.slice(0, sensorIndex),
                    sensorReducer(sensorToChangeColor, action),
                    ...state.sensors.slice(sensorIndex + 1)]
            }
        };
        case StoreSensorsActionType: return {...state, sensors: action.sensors};
        default:
            return state;
    }
};

export const getSensorById = (state: State, id: string) =>
    state.sensors.filter(s => s.id === id)[0];

export const getSensors = (state: State) =>
    state.sensors;