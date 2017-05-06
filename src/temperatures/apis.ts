import {Temperature} from "./state";
import {sensors, createTemperatureValue} from "../data/mocks";

export const getTemperatures = () => new Promise<Temperature[]>((res) => {
    res(sensors.map(s => ({
        sensorId: s.id,
        value: createTemperatureValue(s.id),
        time: new Date().getTime()
    })));
});