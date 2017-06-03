import {getSensors} from "./apis";
import {Sensor} from "./state";
import {Color} from "../core/colors";

export type SetNameForSensorActionType = 'setNameForSensorActionType';
export const SetNameForSensorActionType = 'setNameForSensorActionType';

export type FetchSensorsActionType = 'fetchSensorsActionType';
export const FetchSensorsActionType = 'fetchSensorsActionType';

export type StoreSensorsActionType = 'storeSensorsActionType';
export const StoreSensorsActionType = 'storeSensorsActionType';

export type SetColorForSensorActionType = 'setColorForSensorActionType';
export const SetColorForSensorActionType = 'setColorForSensorActionType';

interface SetNameForSensorAction{
    type: SetNameForSensorActionType;
    id: string;
    name: string;
}

interface FetchSensorsAction{
    type: FetchSensorsActionType;
}

interface StoreSensorsAction{
    type: StoreSensorsActionType;
    sensors: Sensor[];
}

interface SetColorForSensorAction{
    type: SetColorForSensorActionType;
    id: string;
    color: Color;
}

export const createSetNameForSensorAction = (id: string, name: string) => ({
    type: SetNameForSensorActionType,
    id,
    name
});

export const createFetchSensorsAction = () => (dispatch) => {
    getSensors().then(sensors => dispatch(createStoreSensorsAction(sensors)));
};

export const createStoreSensorsAction = (sensors: Sensor[]) => ({
    type: StoreSensorsActionType,
    sensors
});

export const createSetColorForSensorAction = (id: string, color: Color) => ({
    type: SetColorForSensorActionType,
    id,
    color
});

export type Actions = SetNameForSensorAction | FetchSensorsAction | StoreSensorsAction | SetColorForSensorAction;