import {Network} from "./state";
import {getNetworks, connectToNetwork} from "./apis";
import {getNetwork} from "../index";

export type FetchNetworksActionType = 'fetchNetworksActionType';
export const FetchNetworksActionType = 'fetchNetworksActionType';

export type StoreNetworksActionType = 'storeNetworksActionType';
export const StoreNetworksActionType = 'storeNetworksActionType';

export type ConnectToNetworkActionType = 'connectToNetworkActionType';
export const ConnectToNetworkActionType = 'connectToNetworkActionType';

export type StoreConnectionActionType = 'storeConnectionActionType';
export const StoreConnectionActionType = 'storeConnectionActionType';

interface FetchNetworksAction {
    type: FetchNetworksActionType;
}

interface StoreNetworksAction {
    type: StoreNetworksActionType;
    networks: Network[];
}

interface ConnectToNetworkAction {
    type: ConnectToNetworkActionType;
    id: string;
    password?: string;
}

interface StoreConnectionAction {
    type: StoreConnectionActionType;
    network: Network;
}

export const createFetchNetworksAction = () => (dispatch) => {
    getNetworks().then(networks => dispatch(createStoreNetworksAction(networks)));
};

export const createStoreNetworksAction = (networks: Network[]) => ({
    type: StoreNetworksActionType,
    networks
});

export const createConnectToNetworkAction = (id: string, password: string) => (dispatch, getState) => {
    connectToNetwork(id, password).then(() => {
        dispatch(createStoreConnectionAction(getNetwork(getState(), id)));
    });
};

export const createStoreConnectionAction = (network: Network) => ({
    type: StoreConnectionActionType,
    network
});

export type Actions = FetchNetworksAction | StoreNetworksAction | ConnectToNetworkAction | StoreConnectionAction;