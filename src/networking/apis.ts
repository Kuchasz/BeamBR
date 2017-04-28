import {Network} from "./state";

export const getNetworks = () => new Promise<Network[]>((res) => {
    setTimeout(() => {
        res(fakeNetworks);
    }, Math.random() * 2000 + 1000);
});

export const connectToNetwork = (ssid: string, password: string) => new Promise((res, rej) => {
    const networkToConnect = fakeNetworks.filter(n => n.ssid === ssid)[0];
    !networkToConnect && rej();
    !networkToConnect.password && res();
    networkToConnect.password === password && res();
    rej();
});

const fakeNetworks = [
    {
        ssid: 'd-link 94Aec',
        channel: 7,
        strength: 55,
        isSecured: true,
        password: '12345678'
    }, {
        ssid: 'Rom@nX-Pollack',
        channel: 2,
        strength: 81,
        isSecured: true,
        password: '12345678'
    }, {
        ssid: 'Neostrada 2e11',
        channel: 10,
        strength: 65,
        isSecured: false,
        password: undefined
    }, {
        ssid: 'YogaCenter II',
        channel: 5,
        strength: 73,
        isSecured: true,
        password: '12345678'
    },
];