import {Temperature} from "./state";
import {sensors} from "../data/mocks";

export const getTemperatures = () => new Promise<Temperature[]>((res) => {
    res(sensors.map(s => ({
        sensorId: s.id,
        value: Math.floor(Math.random()*800),
        time: new Date().getTime()
    })));
});