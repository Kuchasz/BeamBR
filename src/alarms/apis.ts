import {Alarm, AlarmOccurence} from "./state";
import {alarms, createAlarmOccurences} from "../data/mocks";

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

// export const getTemperatures = () => new Promise<Temperature[]>((res) => {
//     res(sensors.map(s => ({
//         sensorId: s.id,
//         value: createTemperatureValue(s.id),
//         time: new Date().getTime()
//     })));
// });