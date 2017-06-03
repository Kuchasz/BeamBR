import {combineReducers} from "redux";
import * as routes from '../routes/reducer';
import * as login from '../login/reducer';
import * as networking from '../networking/reducer';
import * as sensors from '../sensors/reducer';
import * as temperatures from '../temperatures/reducer';
import * as alarms from '../alarms/reducer';

export const reducer = combineReducers({
    login: login.reducer,
    routes: routes.reducer,
    networking: networking.reducer,
    sensors: sensors.reducer,
    temperatures: temperatures.reducer,
    alarms: alarms.reducer
});

export const getNetwork = (state, id: string) =>
    networking.getNetwork(state.networking, id);

export const getCurrentNetwork = (state) =>
    networking.getCurrentNetwork(state.networking);

export const getNetworks = (state) =>
    networking.getNetworks(state.networking);

export const getSensors = (state) =>
    sensors.getSensors(state.sensors);

export const getInnerRoute = (state) =>
    routes.getInnerRoute(state.routes);

export const getTemperatures = (state) =>
    state.temperatures;

export const getAlarmsForSensor = (state, sensorId: string) =>
    alarms.getAlarmsForSensor(state.alarms, sensorId);

export const getAlarmsOccurences = (state) =>
    alarms.getAlarmsOccurences(state.alarms);

export const getAlarms = (state) =>
    alarms.getAlarms(state.alarms);