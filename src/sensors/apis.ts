import {Sensor} from "./state";

import {sensors} from "../data/mocks";
import { Color, colorFromHex } from "../core/colors";

export const getSensors = () => new Promise<Sensor[]>(res => {
    fetch('sensors')
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
    fetch("sensor/color", {
        method: 'post',
        body: JSON.stringify({id, color: color.hex.slice(1)})
    }).then(() => res(true));
});

export const setNameForSensor = (id: string, name: string) => new Promise<boolean>(res => {
    fetch("sensor/name", {
        method: 'post',
        body: JSON.stringify({id, name})
    }).then(() => res(true));
});