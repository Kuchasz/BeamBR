import * as React from 'preact';
import {Alarm, AlarmType} from "../state";

interface Props extends Alarm{
    onClick: (alarmId: string) => void;
}

export const AlarmListItem = ({id, onClick, isEnabled, temp, type}: Props) => (
    <div onClick={() => onClick(id)} style={{padding: '5px', background: '#DDD', cursor: 'pointer', margin: '5px', opacity: isEnabled ? 1 : 0.5}}>
        <span>{type === AlarmType.HigherThan ? String.fromCharCode(8598) : String.fromCharCode(8601)}</span>
        <span>{temp.toFixed(2)} &#8451;</span>
    </div>
);