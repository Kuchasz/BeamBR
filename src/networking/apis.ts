import {Network} from "./state";

export const getNetworks = () => new Promise<Network[]>((res) => {
    setTimeout(() => {
        res(fakeNetworks);
    }, Math.random() * 2000 + 1000);
});

const fakeNetworks = [
    {
        ssid: 'd-link 94Aec',
        channel: 7,
        strength: 55,
        isSecured: true
    }, {
        ssid: 'Rom@nX-Pollack',
        channel: 2,
        strength: 81,
        isSecured: true
    }, {
        ssid: 'Neostrada 2e11',
        channel: 10,
        strength: 65,
        isSecured: false
    }, {
        ssid: 'YogaCenter II',
        channel: 5,
        strength: 73,
        isSecured: true
    },
];