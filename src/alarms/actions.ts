import {Alarm, AlarmType} from "./state";
import {getAlarms} from "./apis";
export type CreateAlarmActionType = 'createAlarmActionType';
export const CreateAlarmActionType = 'createAlarmActionType';

export type ToggleAlarmActionType = 'toggleAlarmActionType';
export const ToggleAlarmActionType = 'toggleAlarmActionType';

export type FetchAlarmsActionType = 'fetchSensorsActionType';
export const FetchAlarmsActionType = 'fetchSensorsActionType';

export type StoreAlarmsActionType = 'storeAlarmsActionType';
export const StoreAlarmsActionType = 'storeAlarmsActionType';

export interface CreateAlarmAction {
    type: CreateAlarmActionType;
    sensorId: string;
    temp: number;
    alarmType: AlarmType;
    description: string;
}

export interface ToggleAlarmAction {
    type: ToggleAlarmActionType;
    alarmId: string;
}

export interface FetchAlarmsAction {
    type: FetchAlarmsActionType;
}

export interface StoreAlarmsAction{
    type: StoreAlarmsActionType;
    alarms: Alarm[];
}

export const createAlarmAction = (sensorId: string, temp: number, type: AlarmType, description: string) => ({
    type: CreateAlarmActionType,
    sensorId,
    temp,
    alarmType: type,
    description
});

export const createToggleAlarmAction = (alarmId: string) => ({
    type: ToggleAlarmActionType,
    alarmId
});

export const createFetchAlarmsAction = () => (dispatch) => {
    getAlarms().then(alarms => dispatch(createStoreAlarmsAction(alarms)));
};

export const createStoreAlarmsAction = (alarms: Alarm[]) => ({
    type: StoreAlarmsActionType,
    alarms
});

export type Actions = CreateAlarmAction | ToggleAlarmAction | FetchAlarmsAction | StoreAlarmsAction;