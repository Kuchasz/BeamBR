import {VisualizationConfig} from "./state";
export const changeVisualizationConfigActionType = 'changeVisualizationConfig';
export type changeVisualizationConfigActionType = 'changeVisualizationConfig';

export interface ChangeVisualizationConfigAction{
    type: changeVisualizationConfigActionType;
    config: VisualizationConfig;
}

export const createChangeVisualizationConfigAction = (minValue: number, maxValue: number, valueSteps: number): ChangeVisualizationConfigAction =>({
    type: changeVisualizationConfigActionType,
    config: {
        minValue,
        maxValue,
        valueSteps
    }
});

export type Actions = ChangeVisualizationConfigAction;