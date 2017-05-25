import * as React from 'preact';
import {Alarm} from "../state";

interface Props extends Alarm{
    onClick: (alarmId: string) => void;
}

export const AlarmListItem = ({id, onClick, isEnabled, minTemp, maxTemp}: Props) => (
    <div>
        <input onClick={() => onClick(id)} type="checkbox" checked={isEnabled}/>
        <span>Minimum: {minTemp.toString()}</span>
        <span>Maximum: {maxTemp.toString()}</span>
    </div>
);