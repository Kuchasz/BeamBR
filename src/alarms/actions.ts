import {AlarmType} from "./state";
export type CreateAlarmActionType = 'createAlarmActionType';
export const CreateAlarmActionType = 'createAlarmActionType';

export type ToggleAlarmActionType = 'toggleAlarmActionType';
export const ToggleAlarmActionType = 'toggleAlarmActionType';

export interface CreateAlarmAction {
    type: CreateAlarmActionType;
    sensorId: string;
    temp: number;
    alarmType: AlarmType;
}

export interface ToggleAlarmAction {
    type: ToggleAlarmActionType;
    alarmId: string;
}

export const createAlarmAction = (sensorId: string, temp: number, type: AlarmType) => ({
    type: CreateAlarmActionType,
    sensorId,
    temp,
    alarmType: type
});

export const createToggleAlarmAction = (alarmId: string) => ({
    type: ToggleAlarmActionType,
    alarmId
});

export type Actions = CreateAlarmAction | ToggleAlarmAction;