import {Network} from "./state";
import {getNetworks, connectToNetwork} from "./apis";

export type FetchNetworksActionType = 'fetchNetworksActionType';
export const FetchNetworksActionType = 'fetchNetworksActionType';

export type StoreNetworksActionType = 'storeNetworksActionType';
export const StoreNetworksActionType = 'storeNetworksActionType';

export type ConnectToNetworkActionType = 'connectToNetworkActionType';
export const ConnectToNetworkActionType = 'connectToNetworkActionType';

interface FetchNetworksAction {
    type: FetchNetworksActionType;
}

interface StoreNetworksAction{
    type: StoreNetworksActionType;
    networks: Network[];
}

interface ConnectToNetworkAction{
    type: ConnectToNetworkActionType;
    id: string;
    password?: string;
}

export const createFetchNetworksAction = () => (dispatch) => {
    getNetworks().then(networks => dispatch(createStoreNetworksAction(networks)));
};

export const createStoreNetworksAction = (networks: Network[]) => ({
    type: StoreNetworksActionType,
    networks
});

export const createConnectToNetworkAction = (id: string, password: string) => (dispatch) =>{
    connectToNetwork(id, password).then(()=>{
        console.log('Connected to network!');
    }).catch(()=>{
        console.log('Not Connected to network!');
    });
};

export type Actions = FetchNetworksAction | StoreNetworksAction | ConnectToNetworkAction;