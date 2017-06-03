import {Alarm} from "./state";
import {alarms} from "../data/mocks";

export const getAlarms = () => new Promise<Alarm[]>(res => {
    setTimeout(() => {
        res(alarms);
    }, Math.floor(Math.random()*40 + 10));
});