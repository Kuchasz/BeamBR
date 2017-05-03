import {Temperature} from "./state";
import {getTemperatures} from "./apis";

export const FetchTemperaturesActionType = 'fetchTemperaturesActionType';
export type FetchTemperaturesActionType = 'fetchTemperaturesActionType';

export const StoreTemperaturesActionType = 'storeTemperaturesActionType';
export type StoreTemperaturesActionType = 'storeTemperaturesActionType';

interface FetchTemperatuesAction{
    type: FetchTemperaturesActionType;
}

interface StoreTemperaturesAction{
    type: StoreTemperaturesActionType;
    temperatures: Temperature[];
}

export const createFetchTemperaturesAction = () => (dispatch) => {
    getTemperatures().then(temps => {
        dispatch(createStoreTemperaturesAction(temps));
    })
};

export const createStoreTemperaturesAction = (temperatures: Temperature[]) => ({
    type: StoreTemperaturesActionType,
    temperatures
});

export type Actions = FetchTemperatuesAction | StoreTemperaturesAction;