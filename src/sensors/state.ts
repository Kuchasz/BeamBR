import {Color} from "../core/colors";

export interface Sensor{
    id: string;
    resolution: number;
    name?: string;
    color?: Color;
}

export interface State{
    sensors: Sensor[];
}