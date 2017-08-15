import {Temperature} from "./state";
import {sensors, createTemperatureValue} from "../data/mocks";

export const getTemperatures = () => new Promise<Temperature[]>((res) => {
    fetch('temps')
        .then(result => result.json()
            .then(temperatures => res(temperatures
                .map(t => ({
                    sensorId: t.id, 
                    value: Number(t.value), 
                    time: new Date().getTime()})))));
});