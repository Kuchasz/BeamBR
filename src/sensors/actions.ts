export type SetNameForSensorActionType = 'setNameForSensorActionType';
export const SetNameForSensorActionType = 'setNameForSensorActionType';

interface SetNameForSensorAction{
    type: SetNameForSensorActionType;
    id: string;
    name: string;
}

export const createSetNaforForSensorAction = (id: string, name: string) => ({
    type: SetNameForSensorActionType,
    id,
    name
});

export type Actions = SetNameForSensorAction;