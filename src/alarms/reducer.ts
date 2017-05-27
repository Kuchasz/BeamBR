import {State, Alarm} from "./state";
import {Actions, CreateAlarmActionType, ToggleAlarmActionType} from "./actions";
import {v4} from 'uuid';

const initialState: State = {
    alarms: [],
    alarmOccurences: []
};

const alarmReducer = (state: Alarm, action: Actions) => {
    switch (action.type) {
        case ToggleAlarmActionType: {
            return {...state, isEnabled: !state.isEnabled}
        }
        default:
            return state;
    }
};

const alarmsReducer = (state: Alarm[], action: Actions) => {
    switch (action.type) {
        case CreateAlarmActionType: {
            return [...state, {
                id: v4(),
                sensorId: action.sensorId,
                temp: action.temp,
                type: action.alarmType,
                isEnabled: true,
                description: action.description
            }];
        }
        case ToggleAlarmActionType: {
            const alarmToToggle = state.filter(a => a.id === action.alarmId)[0];
            const alarmIndex = state.indexOf(alarmToToggle);
            return [...state.slice(0, alarmIndex),
                alarmReducer(alarmToToggle, action),
                ...state.slice(alarmIndex + 1)];
        }
        default:
            return state;
    }
};

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case CreateAlarmActionType:
            return {...state, alarms: alarmsReducer(state.alarms, action)};
        case ToggleAlarmActionType:
            return {...state, alarms: alarmsReducer(state.alarms, action)};
        default:
            return state;
    }
}

export const getAlarmsForSensor = (state: State, sensorId: string) =>
    state.alarms.filter(s => s.sensorId === sensorId);

export const getAlarmsOccurences = (state: State) =>
    state.alarmOccurences;