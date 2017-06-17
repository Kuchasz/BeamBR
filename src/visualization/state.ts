export interface VisualizationConfig{
    minValue: number;
    maxValue: number;
    valueSteps: number;
    selectedIntervalName: string;
}

export interface VisualizationInterval{
    name: string;
    time: number;
}

export interface State {
    config: VisualizationConfig;
    intervals: VisualizationInterval[];
};