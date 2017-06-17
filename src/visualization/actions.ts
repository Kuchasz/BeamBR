import {VisualizationConfig} from "./state";

export const ChangeVisualizationConfigActionType = 'changeVisualizationConfig';
export type ChangeVisualizationConfigActionType = 'changeVisualizationConfig';

export interface ChangeVisualizationConfigAction{
    type: ChangeVisualizationConfigActionType;
    config: VisualizationConfig;
}

export const createChangeVisualizationConfigAction = (config: VisualizationConfig): ChangeVisualizationConfigAction =>({
    type: ChangeVisualizationConfigActionType,
    config
});

export type Actions = ChangeVisualizationConfigAction;