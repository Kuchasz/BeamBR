import {State, Alarm} from "./state";
import {Actions, CreateAlarmActionType, ToggleAlarmActionType} from "./actions";
import {v4} from 'uuid';

const initialState = [];

const alarmReducer = (state: Alarm, action: Actions) => {
    switch (action.type){
        case ToggleAlarmActionType: {
            return {...state, isEnabled: !state.isEnabled}
        }
        default:
            return state;
    }
};

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type){
        case CreateAlarmActionType: {
            return [...state, {
                id: v4(),
                sensorId: action.sensorId,
                minTemp: action.minTemp,
                maxTemp: action.maxTemp,
                isEnabled: true
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