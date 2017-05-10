import {State} from "./state";
import {Actions, CreateAlarmActionType, ToggleAlarmAction, ToggleAlarmActionType} from "./actions";

export const reducer = (state: State, action: Actions) => {
    switch (action.type){
        case CreateAlarmActionType: {
            return [...state, {
                id: '',
                sensorId: action.sensorId,
                minTemp: action.minTemp,
                maxTemp: action.maxTemp
            }];
        }
        case ToggleAlarmActionType: {
            const alarmToToggle = state.filter(a => a.id === action.alarmId)[0];
            const alarmIndex = state.indexOf(alarmToToggle);
            return [...state.slice(0, alarmIndex),
                {},
                ...state.slice(alarmIndex + 1)];
        }
        default:
            return state;
    }
};