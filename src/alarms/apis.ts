import {Alarm, AlarmOccurence, AlarmType} from "./state";
import {alarms, createAlarmOccurences, addAlarm, removeAlarm} from "../data/mocks";
import {v4} from 'uuid';

export const getAlarms = () => new Promise<Alarm[]>(res => {
    setTimeout(() => {
        res([...alarms]);
    }, Math.floor(Math.random() * 40 + 10));
});

export const getAlarmsOccurences = () => new Promise<AlarmOccurence[]>(res => {
    setTimeout(() => {
        res(createAlarmOccurences())
    }, Math.floor(Math.random() * 90 + 10))
});

export const saveAlarm = (sensorId: string, temp: number, type: AlarmType, description: string) => new Promise<Alarm>(res => {
    setTimeout(() => {
        const alarm = {
            id: v4(),
            isEnabled: true,
            sensorId,
            temp,
            type,
            description
        };
        addAlarm(alarm);
        res(alarm);
    }, Math.floor(Math.random() * 90 + 10));
});

export const deleteAlarm = (alarmId: string) => new Promise<boolean>(res => {
    setTimeout(() => {
        removeAlarm(alarmId);
        res(true);
    }, Math.floor(Math.random() * 90 + 10));
});