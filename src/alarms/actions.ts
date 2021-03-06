import {Alarm, AlarmOccurence, AlarmType} from "./state";
import {deleteAlarm, getAlarms, getAlarmsOccurences, saveAlarm} from "./apis";

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

export type DeleteAlarmActionType = 'deleteAlarmActionType';
export const DeleteAlarmActionType = 'deleteAlarmActionType';

export interface CreateAlarmAction {
    type: CreateAlarmActionType;
    alarm: Alarm;
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

export interface DeleteAlarmAction{
    type: DeleteAlarmActionType;
    alarmId: string;
}

export const createAlarmAction = (sensorId: string, temp: number, type: AlarmType, description: string) => (dispatch, getState) => {
    saveAlarm(
        sensorId,
        temp,
        type,
        description
    ).then(alarm => dispatch(({
        type: CreateAlarmActionType,
        alarm
    })));
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

export const createDeleteAlarmAction = (alarmId: string) => (dispatch) => {
    deleteAlarm(alarmId)
        .then(() => dispatch({
            type: DeleteAlarmActionType,
            alarmId
        }));
};

export type Actions = CreateAlarmAction | ToggleAlarmAction | FetchAlarmsAction | StoreAlarmsAction | FetchAlarmsOccurencesAction | StoreAlarmsOccurencesAction | AcceptPastAlarmOccurenceAction | DeleteAlarmAction;