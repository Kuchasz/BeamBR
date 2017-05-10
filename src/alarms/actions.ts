export type CreateAlarmActionType = 'createAlarmActionType';
export const CreateAlarmActionType = 'createAlarmActionType';

export type ToggleAlarmActionType = 'toggleAlarmActionType';
export const ToggleAlarmActionType = 'toggleAlarmActionType';

export interface CreateAlarmAction {
    type: CreateAlarmActionType;
    sensorId: string;
    minTemp: number;
    maxTemp: number;
}

export interface ToggleAlarmAction {
    type: ToggleAlarmActionType;
    alarmId: string;
}

export const createAlarmAction = (sensorId: string, minTemp: number, maxTemp: number) => ({
    type: CreateAlarmActionType,
    sensorId,
    minTemp,
    maxTemp
});

export const createToggleAlarmAction = (alarmId: string) => ({
    type: ToggleAlarmActionType,
    alarmId
});

export type Actions = CreateAlarmAction | ToggleAlarmAction;