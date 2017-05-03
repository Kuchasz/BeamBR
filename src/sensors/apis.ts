import {Sensor} from "./state";

import {sensors} from "../data/mocks";

export const getSensors = () => new Promise<Sensor[]>((res)=>{
    setTimeout(()=>{
        res(sensors);
    }, Math.random()*2000 + 1000);
});