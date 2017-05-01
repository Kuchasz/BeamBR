import {combineReducers} from "redux";
import * as routes from '../routes/reducer';
import * as login from '../login/reducer';
import * as networking from '../networking/reducer';
import * as sensors from '../sensors/reducer';

export const reducer = combineReducers({
    login: login.reducer,
    routes: routes.reducer,
    networking: networking.reducer,
    sensors: sensors.reducer
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