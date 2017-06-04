import {Alarm, AlarmOccurence} from "./state";
import {alarms, createAlarmOccurences, addAlarm, removeAlarm} from "../data/mocks";

export const getAlarms = () => new Promise<Alarm[]>(res => {
    setTimeout(() => {
        res(alarms);
    }, Math.floor(Math.random() * 40 + 10));
});

export const getAlarmsOccurences = () => new Promise<AlarmOccurence[]>(res => {
    setTimeout(() => {
        res(createAlarmOccurences())
    }, Math.floor(Math.random() * 90 + 10))
});

export const saveAlarm = (alarm: Alarm) => new Promise<boolean>(res => {
    setTimeout(() => {
        addAlarm(alarm);
        res(true);
    }, Math.floor(Math.random() * 90 + 10));
});

export const deleteAlarm = (alarmId: string) => new Promise<boolean>(res => {
    setTimeout(() => {
        removeAlarm(alarmId);
        res(true);
    }, Math.floor(Math.random() * 90 + 10));
});