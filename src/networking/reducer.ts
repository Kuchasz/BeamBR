import {State, Network, NetworkConnection} from "./state";
import {Actions, StoreNetworksActionType, StoreConnectionActionType} from "./actions";
const initialState = {
    connection: {
        network: {
            ssid: undefined,
            strength: undefined,
            isSecured: undefined,
            channel: undefined
        }
    },
    networks: []
};

export const reducer = (state: State = initialState, action: Actions): State =>{
    switch (action.type){
        case StoreNetworksActionType:
            return {...state, networks: action.networks};
        case StoreConnectionActionType:
            return {...state, connection: connectionReducer(state.connection, action)};
        default:
            return state;
    }
};

const connectionReducer = (state: NetworkConnection, action: Actions): NetworkConnection => {
    switch (action.type){
        case StoreConnectionActionType:
            return {...state, network: action.network};
        default:
            return state;
    }
};

export const getIsSecured = (state: State, ssid: string) =>
    getNetwork(state, ssid).isSecured;

export const getNetwork = (state: State, ssid: string) =>
    state.networks.filter(n => n.ssid === ssid)[0];

export const getCurrentNetwork = (state: State) =>
    state.connection.network;

export const getNetworks = (state: State) =>
    state.networks;