export interface Sensor{
    id: string;
    resolution: number;
    name?: string;
}

export interface State{
    sensors: Sensor[];
}