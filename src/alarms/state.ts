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
    description: string;
}

export enum AlarmOccurenceType{
    Past,
    Current
}

export interface AlarmOccurence{
    alarmId: string;
    type: AlarmOccurenceType;
}

export interface SensorAlarm{
    alarmType: AlarmType;
    occurenceType: AlarmOccurenceType;
    temp: number;
}

export interface State {
    alarms: Alarm[];
    alarmOccurences: AlarmOccurence[];
}