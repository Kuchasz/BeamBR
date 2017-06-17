import {VisualizationConfig} from "./state";

export const changeVisualizationConfigActionType = 'changeVisualizationConfig';
export type changeVisualizationConfigActionType = 'changeVisualizationConfig';

export interface ChangeVisualizationConfigAction{
    type: changeVisualizationConfigActionType;
    config: VisualizationConfig;
}

export const createChangeVisualizationConfigAction = (config: VisualizationConfig): ChangeVisualizationConfigAction =>({
    type: changeVisualizationConfigActionType,
    config
});

export type Actions = ChangeVisualizationConfigAction;