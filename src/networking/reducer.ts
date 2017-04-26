import {State, Network} from "./state";
const initialState = {
    currentNetwork: undefined,
    networks: [
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
    ]
};

export const reducer = (state: State = initialState, action) =>
    state;

export const getIsSecured = (networks: Network[], ssid: string) =>
    networks.filter(n => n.ssid === ssid)[0].isSecured;