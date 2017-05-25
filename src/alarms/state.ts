export enum AlarmType{
    LowerThan,
    HigherThan
}

export interface Alarm{
    id: string;
    sensorId: string;
    temp: number;
    type: AlarmType;
    isEnabled: boolean;
}

export type State = Alarm[];