import {VisualizationConfig} from "./state";

export const ChangeVisualizationConfigActionType = 'changeVisualizationConfig';
export type ChangeVisualizationConfigActionType = 'changeVisualizationConfig';

export const HideVisualizationSensorActionType = 'hideVisualizationSensor';
export type HideVisualizationSensorActionType = 'hideVisualizationSensor';

export const GrayVisualizationSensorActionType = 'grayVisualizationSensor';
export type GrayVisualizationSensorActionType = 'grayVisualizationSensor';

export interface ChangeVisualizationConfigAction{
    type: ChangeVisualizationConfigActionType;
    config: VisualizationConfig;
}

export interface HideVisualizationSensorAction{
    type: HideVisualizationSensorActionType;
    sensorId: string;
}

export interface GrayVisualizationSensorAction{
    type: GrayVisualizationSensorActionType;
    sensorId: string;
}

export const createChangeVisualizationConfigAction = (config: VisualizationConfig): ChangeVisualizationConfigAction =>({
    type: ChangeVisualizationConfigActionType,
    config
});

export const createHideVisualizationSensorAction = (sensorId: string): HideVisualizationSensorAction => ({
    type: HideVisualizationSensorActionType,
    sensorId
});

export const createGrayVisualizationSensorAction = (sensorId: string): GrayVisualizationSensorAction => ({
    type: GrayVisualizationSensorActionType,
    sensorId
});

export type Actions = ChangeVisualizationConfigAction | HideVisualizationSensorAction | GrayVisualizationSensorAction;