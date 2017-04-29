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

export const reducer = (state: State = initialState, action: Actions) =>{
    switch (action.type){
        case StoreNetworksActionType:
            return {...state, networks: action.networks};
        case StoreConnectionActionType:
            return {...state, connection: connectionReducer(state.connection, action)};
        default:
            return state;
    }
};

const connectionReducer = (state: NetworkConnection, action: Actions) => {
    switch (action.type){
        case StoreConnectionActionType:
            return {...state, network: action.network};
        default:
            return state;
    }
};

export const getIsSecured = (networks: Network[], ssid: string) =>
    getNetwork(networks, ssid).isSecured;

export const getNetwork = (networks: Network[], ssid: string) =>
    networks.filter(n => n.ssid === ssid)[0];

export const getCurrentNetwork = (state: State) =>
    state.connection.network;