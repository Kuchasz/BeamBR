export interface Alarm{
    id: string;
    sensorId: string;
    minTemp?: number;
    maxTemp?: number;
    isEnabled: boolean;
}

export type State = Alarm[];