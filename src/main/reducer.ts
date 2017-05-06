import {combineReducers} from "redux";
import * as routes from '../routes/reducer';
import * as login from '../login/reducer';
import * as networking from '../networking/reducer';
import * as sensors from '../sensors/reducer';
import * as temperatures from '../temperatures/reducer';

export const reducer = combineReducers({
    login: login.reducer,
    routes: routes.reducer,
    networking: networking.reducer,
    sensors: sensors.reducer,
    temperatures: temperatures.reducer
});

export const getNetwork = (state, id: string) =>
    networking.getNetwork(state.networking, id);

export const getCurrentNetwork = (state) =>
    networking.getCurrentNetwork(state.networking);

export const getNetworks = (state) =>
    networking.getNetworks(state.networking);

export const getSensors = (state) =>
    sensors.getSensors(state.sensors);

export const getSensorById = (state, id: string) =>
    sensors.getSensorById(state.sensors, id);

export const getInnerRoute = (state) =>
    routes.getInnerRoute(state.routes);

export const getTemperatures = (state) =>
    state.temperatures;

export const getLastTemp = (state, sensorId: string) =>
    temperatures.getLastTemp(state.temperatures, sensorId);