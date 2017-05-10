export interface Temperature{
    sensorId: string;
    value: number;
    time: number;
}

export type State = Temperature[];