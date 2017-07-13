import {Temperature} from "./state";
import {sensors, createTemperatureValue} from "../data/mocks";

export const getTemperatures = () => new Promise<Temperature[]>((res) => {
    fetch('http://192.168.1.5/temps')
        .then(result => result.json()
            .then(temperatures => res(temperatures
                .map(t => ({
                    sensorId: t.id, 
                    value: Number(t.value), 
                    time: new Date().getTime()})))));
    // res(sensors.map(s => ({
    //     sensorId: s.id,
    //     value: createTemperatureValue(s.id),
    //     time: new Date().getTime()
    // })));
});