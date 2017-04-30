import {Sensor} from "./state";

const createFakeSensor = () => ({
    id: (Math.random() * 10 ** 10).toFixed(0),
    resolution: Math.floor(Math.random()*3)+9
});

const fakeSensors = Array.from(Array(Math.floor(Math.random() * 10)).keys()).map(() => createFakeSensor());

export const getSensors = () => new Promise<Sensor[]>((res, rej)=>{
    setTimeout(()=>{
        res(fakeSensors);
    }, Math.random()*2000 + 1000);
});