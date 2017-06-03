import {State, Alarm, AlarmOccurence, AlarmOccurenceType} from "./state";
import {
    Actions, CreateAlarmActionType, StoreAlarmsActionType, StoreAlarmsOccurencesActionType,
    ToggleAlarmActionType
} from "./actions";
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

const alarmsOccurencesReducer = (state: AlarmOccurence[], action: Actions) => {
    switch (action.type) {
        case StoreAlarmsOccurencesActionType: {
            const previousAlarmsOccurencesAlarmsIds = state.map(a => a.alarmId);
            const currentAlarmsOccurencesAlarmsIds = action.alarmsOccurences.map(a => a.alarmId);
            const pastAlarmsOccurencesIds = previousAlarmsOccurencesAlarmsIds.filter(id => currentAlarmsOccurencesAlarmsIds.indexOf(id) === -1);
            const pastAlarmsOccurences = state.filter(a => pastAlarmsOccurencesIds.indexOf(a.alarmId) !== -1);
            return [...pastAlarmsOccurences.map(a => ({...a, type: AlarmOccurenceType.Past})), ...action.alarmsOccurences];
        }
        default:
            return state;
    };
};

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case CreateAlarmActionType:
            return {...state, alarms: alarmsReducer(state.alarms, action)};
        case ToggleAlarmActionType:
            return {...state, alarms: alarmsReducer(state.alarms, action)};
        case StoreAlarmsActionType:
            return {...state, alarms: action.alarms};
        case StoreAlarmsOccurencesActionType:
            return {...state, alarmOccurences: alarmsOccurencesReducer(state.alarmOccurences, action)}
        default:
            return state;
    }
}

export const getAlarmsForSensor = (state: State, sensorId: string) =>
    state.alarms.filter(s => s.sensorId === sensorId);

export const getAlarmsOccurences = (state: State) =>
    state.alarmOccurences;