import {colors} from "../core/colors";
import {Alarm, AlarmType} from "../alarms/state";
import {v4} from 'uuid';
const networksSSIDs = ['Theros', 'Neostrada', 'Linksys', 'D-link', 'Aero', 'Netia', 'TPNeo'];
const sensorsNames = ['Kolumna', 'Baniak', 'Rurka', 'Tutla', 'Zawór', 'Tuleja', 'Lejek', 'Kolanko', 'Odpływ', 'Pogon', 'Napar', 'Solanka'];

const createSensor = () => ({
    id: (Math.random() * 10 ** 10).toFixed(0),
    resolution: Math.floor(Math.random()*3)+9,
    name: sensorsNames[Math.floor(Math.random() * sensorsNames.length)],
    color: colors[Math.floor(Math.random()* colors.length)]
});

export const sensors = Array.from(Array(Math.floor(Math.random() * 7 + 3)).keys()).map(() => createSensor());

const createNetwork = () => ({
    ssid: networksSSIDs[Math.floor(Math.random() * networksSSIDs.length)] + (Math.random() * (10 ** 5)).toFixed(0).toString(),
    channel: Math.floor(Math.random() * 11) + 1,
    strength: (Math.floor(Math.random() * 50) + 30),
    isSecured: Math.random() > 0.25,
    password: '12345678'
});

export const networks = Array.from(Array(Math.floor(Math.random() * 10)).keys()).map(() => createNetwork());

const lastTempsForSensors = {};
export const createTemperatureValue = (sensorId : string) => {
    const lastTempForSensor = lastTempsForSensors[sensorId] || Math.random() * 50 + 20;

    const offset = Math.random() - 0.5;
    let newTempForSensor = lastTempForSensor + offset;
    if (newTempForSensor <= 10 || newTempForSensor >= 70)
        newTempForSensor = lastTempForSensor - offset;

    lastTempsForSensors[sensorId] = newTempForSensor;
    return newTempForSensor;
};

export const createAlarm: () => Alarm = () => ({
    id: v4(),
    sensorId: sensors[Math.floor(Math.random()*sensors.length)].id,
    isEnabled: Math.random() > 0.25,
    temp: Math.random() > 0.5 ? (Math.random() * 50) : undefined,
    type: Math.random() > 0.5 ? AlarmType.HigherThan : AlarmType.LowerThan
});

export const alarms = Array.from(Array(Math.floor(Math.random() * 15)).keys()).map(() => createAlarm());