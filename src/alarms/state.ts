export interface Alarm{
    id: string;
    sensorId: string;
    minTemp?: number;
    maxTemp?: number;
}

export type State = Alarm[];