import {colors} from "../core/colors";
import {Alarm, AlarmOccurence, AlarmOccurenceType, AlarmType} from "../alarms/state";
import {v4} from 'uuid';
import {Sensor} from "../sensors/state";
import {Network} from "../networking/state";

const networksSSIDs = ['Theros', 'Neostrada', 'Linksys', 'D-link', 'Aero', 'Netia', 'TPNeo'];
const sensorsNames = ['Kolumna', 'Baniak', 'Rurka', 'Tutla', 'Zawór', 'Tuleja', 'Lejek', 'Kolanko', 'Odpływ', 'Pogon', 'Napar', 'Solanka'];
const alarmsDescriptions = ['is too hot', 'has too big temp', 'is cold'];

const createSensor = (): Sensor => ({
    id: (Math.random() * 10 ** 10).toFixed(0),
    resolution: Math.floor(Math.random() * 3) + 9,
    name: sensorsNames[Math.floor(Math.random() * sensorsNames.length)],
    color: colors[Math.floor(Math.random() * colors.length)]
});

export const sensors = Array.from(Array(Math.floor(Math.random() * 7 + 3)).keys()).map(() => createSensor());

const createNetwork = (): Network => ({
    ssid: networksSSIDs[Math.floor(Math.random() * networksSSIDs.length)] + (Math.random() * (10 ** 5)).toFixed(0).toString(),
    channel: Math.floor(Math.random() * 11) + 1,
    strength: (Math.floor(Math.random() * 50) + 30),
    isSecured: Math.random() > 0.25
});

export const networks = Array.from(Array(Math.floor(Math.random() * 10)).keys()).map(() => createNetwork());

const lastTempsForSensors = {};

export const createTemperatureValue = (sensorId: string) => {
    const lastTempForSensor = lastTempsForSensors[sensorId] || Math.random() * 50 + 20;

    const offset = Math.random() - 0.5;
    let newTempForSensor = lastTempForSensor + offset;
    if (newTempForSensor <= 10 || newTempForSensor >= 70)
        newTempForSensor = lastTempForSensor - offset;

    lastTempsForSensors[sensorId] = newTempForSensor;
    return newTempForSensor;
};

const createAlarm: () => Alarm = () => ({
    id: v4(),
    sensorId: sensors[Math.floor(Math.random() * sensors.length)].id,
    isEnabled: Math.random() > 0.25,
    temp: Math.random() * 50,
    type: Math.random() > 0.5 ? AlarmType.HigherThan : AlarmType.LowerThan,
    description: alarmsDescriptions[Math.floor(Math.random() * alarmsDescriptions.length)]
});

export const alarms = Array.from(Array(Math.floor(Math.random() * 15)).keys()).map(() => createAlarm());

export const addAlarm = (alarm: Alarm) => alarms.push({...alarm, id: v4()});

const getLastTempForSensor = (sensorId: string): number => lastTempsForSensors[sensorId];

const getIfAlarmShouldOccur = (alarm: Alarm): boolean => {
    const temp = getLastTempForSensor(alarm.sensorId);

    return alarm.type === AlarmType.LowerThan ? temp < alarm.temp :
        alarm.type === AlarmType.HigherThan ? temp > alarm.temp :
            undefined
};

export const createAlarmOccurences = (): AlarmOccurence[] => {
    return alarms.filter(a => getIfAlarmShouldOccur(a)).map(a => ({
        alarmId: a.id,
        type: AlarmOccurenceType.Current,
        temp: getLastTempForSensor(a.sensorId)
    }));
};