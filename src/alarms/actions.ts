export type createAlarmActionType = 'createAlarmActionType';
export const createAlarmActionType = 'createAlarmActionType';

export type toggleAlarmActionType = 'toggleAlarmActionType';
export const toggleAlarmActionType = 'toggleAlarmActionType';

export interface CreateAlarmAction {
    type: createAlarmActionType;
    sensorId: string;
    minTemp: number;
    maxTemp: number;
}

export interface ToggleAlarmAction {
    type: toggleAlarmActionType;
    alarmId: string;
}

export const createAlarmAction = (sensorId: string, minTemp: number, maxTemp: number) => ({
    type: createAlarmActionType,
    sensorId,
    minTemp,
    maxTemp
});

export const createToggleAlarmAction = (alarmId: string) => ({
    type: toggleAlarmActionType,
    alarmId
});

export type Actions = CreateAlarmAction | ToggleAlarmAction;