import {getSensors} from "./apis";
import {Sensor} from "./state";

export type SetNameForSensorActionType = 'setNameForSensorActionType';
export const SetNameForSensorActionType = 'setNameForSensorActionType';

export type FetchSensorsActionType = 'fetchSensorsActionType';
export const FetchSensorsActionType = 'fetchSensorsActionType';

export type StoreSensorsActionType = 'storeSensorsActionType';
export const StoreSensorsActionType = 'storeSensorsActionType';

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

export const createSetNameForSensorAction = (id: string, name: string) => ({
    type: SetNameForSensorActionType,
    id,
    name
});

export const createStoreSensorsAction = (sensors: Sensor[]) => ({
    type: StoreSensorsActionType,
    sensors
});

export const createFetchSensorsAction = () => (dispatch) => {
    getSensors().then(sensors => {
        dispatch(createStoreSensorsAction(sensors));
    });
}

export type Actions = SetNameForSensorAction | FetchSensorsAction | StoreSensorsAction;