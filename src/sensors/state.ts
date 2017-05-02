import {Color} from "../core/components/color-palette";

export interface Sensor{
    id: string;
    resolution: number;
    name?: string;
    color?: Color;
}

export interface State{
    sensors: Sensor[];
}