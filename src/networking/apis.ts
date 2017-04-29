import {Network} from "./state";

const _ssids = ['theros', 'neostrada', 'linksys', 'd-link', 'Aero', 'Netia', 'TPNeo']

const createFakeNetwork = () => ({
    ssid: _ssids[Math.floor(Math.random() * _ssids.length)] + (Math.random() * (10 ** 5)).toFixed(0).toString(),
    channel: Math.floor(Math.random() * 11) + 1,
    strength: (Math.floor(Math.random() * 50) + 30),
    isSecured: Math.random() > 0.25,
    password: '12345678'
});

const fakeNetworks = Array.from(Array(Math.floor(Math.random() * 10)).keys()).map(() => createFakeNetwork());

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