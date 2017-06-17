import {State, VisualizationConfig, VisualizationInterval} from "./state";
import {
    Actions, ChangeVisualizationConfigActionType, GrayVisualizationSensorActionType,
    HideVisualizationSensorActionType
} from "./actions";

const initialState: State = {
    config: {
        minValue: 20,
        maxValue: 80,
        valueSteps: 25,
        selectedIntervalName: '30s',
        hiddenSensors: [],
        grayedSensors: []
    },
    intervals: [{
        name: '1h',
        time: 3600
    }, {
        name: '30m',
        time: 1800
    }, {
        name: '10m',
        time: 600
    }, {
        name: '5m',
        time: 300
    }, {
        name: '2m',
        time: 120
    }, {
        name: '1m',
        time: 60
    }, {
        name: '30s',
        time: 30
    }, {
        name: '15s',
        time: 15
    }, {
        name: '10s',
        time: 10
    }, {
        name: '5s',
        time: 5
    }]
};

export const reducer = (state: State = initialState, action: Actions): State => {
    switch (action.type) {
        case HideVisualizationSensorActionType: {
            const sensorIndex = state.config.hiddenSensors.indexOf(action.sensorId);
            const hiddenSensors = (sensorIndex === -1)
                ? [...state.config.hiddenSensors, action.sensorId]
                : [...state.config.hiddenSensors.slice(0, sensorIndex), ...state.config.hiddenSensors.slice(sensorIndex + 1)]
            return {...state, config: {...state.config, hiddenSensors}}
        }
        case GrayVisualizationSensorActionType: {
            const sensorIndex = state.config.grayedSensors.indexOf(action.sensorId);
            const grayedSensors = (sensorIndex === -1)
                ? [...state.config.grayedSensors, action.sensorId]
                : [...state.config.grayedSensors.slice(0, sensorIndex), ...state.config.grayedSensors.slice(sensorIndex + 1)]
            return {...state, config: {...state.config, grayedSensors}}
        }
        case ChangeVisualizationConfigActionType:
            return {...state, config: action.config};
        default:
            return state;
    }
};

export const getConfig = (state: State): VisualizationConfig =>
    state.config;

export const getIntervals = (state: State): VisualizationInterval[] =>
    state.intervals;