import {Network} from "./state";
import {getNetworks} from "./apis";

export type FetchNetworksActionType = 'fetchNetworksActionType';
export const FetchNetworksActionType = 'fetchNetworksActionType';

export type StoreNetworksActionType = 'storeNetworksActionType';
export const StoreNetworksActionType = 'storeNetworksActionType';

interface FetchNetworksAction {
    type: FetchNetworksActionType;
}

interface StoreNetworksAction{
    type: StoreNetworksActionType;
    networks: Network[];
}

export const createFetchNetworksAction = () => (dispatch) => {
    getNetworks().then(networks => dispatch(createStoreNetworksAction(networks)));
};

export const createStoreNetworksAction = (networks: Network[]) => ({
    type: StoreNetworksActionType,
    networks
});

export type Actions = FetchNetworksAction | StoreNetworksAction;