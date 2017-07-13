import {Sensor} from "./state";

import {sensors} from "../data/mocks";
import { Color, colorFromHex } from "../core/colors";

export const getSensors = () => new Promise<Sensor[]>(res => {
    fetch('http://192.168.1.5/sensors')
        .then(result => result
            .json()
            .then(sensors => res(sensors.map(s => ({
                id: s.id,
                resolution: s.resolution,
                name: s.name,
                color: colorFromHex(s.color)
            })))));
});

export const setColorForSensor = (id: string, color: Color) => new Promise<boolean>(res => {
    fetch("http://192.168.1.5/sensor/color", {
        method: 'post',
        body: JSON.stringify({id, color: color.hex.slice(1)})
    }).then(() => res(true));
});

export const setNameForSensor = (id: string, name: string) => new Promise<boolean>(res => {
    fetch("http://192.168.1.5/sensor/name", {
        method: 'post',
        body: JSON.stringify({id, name})
    }).then(() => res(true));
});