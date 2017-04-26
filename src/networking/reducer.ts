import {State} from "./state";
const initialState = {
    networks: [
        {
            name: 'd-link 94Aec',
            channel: 7,
            strength: 55
        }, {
            name: 'Rom@nX-Pollack',
            channel: 2,
            strength: 81
        }, {
            name: 'Neostrada 2e11',
            channel: 10,
            strength: 65
        }, {
            name: 'YogaCenter II',
            channel: 5,
            strength: 73
        },
    ]
};

export const reducer = (state: State = initialState, action) => state;