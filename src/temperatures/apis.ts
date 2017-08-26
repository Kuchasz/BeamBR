import {Temperature} from "./state";
import {sensors, createTemperatureValue} from "../data/mocks";

// setTimeout(() => res(sensors.map(s => ({
//     value: createTemperatureValue(s.id),
//     sensorId: s.id,
//     time: new Date().getTime()
// }))), Math.random() * 50 + 50);

export const getTemperatures = () => new Promise<Temperature[]>((res) => {
    fetch('temps')
        .then(result => result.json()
            .then(temperatures => res(temperatures
                .map(t => ({
                    sensorId: t.id, 
                    value: Number(t.value), 
                    time: new Date().getTime()})))));
});