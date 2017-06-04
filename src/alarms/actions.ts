import {Alarm, AlarmOccurence, AlarmType} from "./state";
import {getAlarms, getAlarmsOccurences, saveAlarm} from "./apis";

export type CreateAlarmActionType = 'createAlarmActionType';
export const CreateAlarmActionType = 'createAlarmActionType';

export type ToggleAlarmActionType = 'toggleAlarmActionType';
export const ToggleAlarmActionType = 'toggleAlarmActionType';

export type FetchAlarmsActionType = 'fetchSensorsActionType';
export const FetchAlarmsActionType = 'fetchSensorsActionType';

export type StoreAlarmsActionType = 'storeAlarmsActionType';
export const StoreAlarmsActionType = 'storeAlarmsActionType';

export type FetchAlarmsOccurencesActionType = 'fetchAlarmsOccurencesActionType';
export const FetchAlarmsOccurencesActionType = 'fetchAlarmsOccurencesActionType';

export type StoreAlarmsOccurencesActionType = 'storeAlarmsOccurencesActionType';
export const StoreAlarmsOccurencesActionType = 'storeAlarmsOccurencesActionType';

export type AcceptPastAlarmOccurenceActionType = 'acceptPastAlarmOccurenceActionType ';
export const AcceptPastAlarmOccurenceActionType = 'acceptPastAlarmOccurenceActionType ';

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

export interface FetchAlarmsOccurencesAction{
    type: FetchAlarmsOccurencesActionType;
}

export interface StoreAlarmsOccurencesAction{
    type: StoreAlarmsOccurencesActionType;
    alarmsOccurences: AlarmOccurence[];
}

export interface AcceptPastAlarmOccurenceAction{
    type: AcceptPastAlarmOccurenceActionType;
    alarmId: string;
}

export const createAlarmAction = (sensorId: string, temp: number, type: AlarmType, description: string) => (distpach) => {
    saveAlarm({
        id: undefined,
        isEnabled: true,
        sensorId,
        temp,
        type,
        description
    }).then(() => distpach(createFetchAlarmsAction()));
};

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

export const createFetchAlarmsOccurencesAction = () => (dispatch) => {
    getAlarmsOccurences().then(alarmsOccurences => dispatch(createStoreAlarmsOccurencesAction(alarmsOccurences)))
};

export const createStoreAlarmsOccurencesAction = (alarmsOccurences: AlarmOccurence[]) => ({
    type: StoreAlarmsOccurencesActionType,
    alarmsOccurences
});

export const createAcceptPastAlarmOccurenceAction = (alarmId: string) => ({
    type: AcceptPastAlarmOccurenceActionType,
    alarmId
});

export type Actions = CreateAlarmAction | ToggleAlarmAction | FetchAlarmsAction | StoreAlarmsAction | FetchAlarmsOccurencesAction | StoreAlarmsOccurencesAction | AcceptPastAlarmOccurenceAction;