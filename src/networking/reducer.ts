import {State, Network} from "./state";
import {Actions, StoreNetworksActionType} from "./actions";
const initialState = {
    currentNetworkSSID: undefined,
    networks: []
};

export const reducer = (state: State = initialState, action: Actions) =>{
    switch (action.type){
        case StoreNetworksActionType:
            console.log(action.type);
            return {...state, networks: action.networks};
        default:
            return state;
    }
}

export const getIsSecured = (networks: Network[], ssid: string) =>
    networks.filter(n => n.ssid === ssid)[0].isSecured;