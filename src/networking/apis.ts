import {Network} from "./state";
import {networks} from "../data/mocks";

export const getNetworks = () => new Promise<Network[]>((res) => {
    setTimeout(() => res(networks), Math.random() * 50 + 50);
    // fetch("http://192.168.1.5/networks")
    //     .then(result => result.json()
    //         .then(networks => res(networks)));
});

export const connectToNetwork = (ssid: string, password: string) => new Promise((res, rej) => {
    const networkToConnect = networks.filter(n => n.ssid === ssid)[0];
    if (networkToConnect === undefined) rej();
    if (networkToConnect.isSecured === false) res();
    if ('12345678' === password) res();
    rej();
});