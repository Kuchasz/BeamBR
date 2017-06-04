import * as React from 'preact';
import {Alarm, AlarmType} from "../state";
import {css} from 'glamor';

interface Props extends Alarm {
    onToggle: (alarmId: string) => void;
    onDelete: (alarmId: string) => void;
}

export const AlarmListItem = ({id, onToggle, onDelete, isEnabled, temp, type}: Props) => (
    <div {...css({
        display: 'flex',
        alignItems: 'center',
        background: '#DDD',
        cursor: 'pointer',
        margin: '5px'
    })}>
        <div onClick={() => onDelete(id)} {...css({
            transition: 'all 0.25s',
            height: '100%',
            width: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ':hover': {
                background: 'red',
                '> div': {
                    transform: 'rotate(-45deg)',
                    fontSize: '20px'
                }
            }
        })}>
            <div {...css({
                transition: 'all 0.25s',
                transform: 'rotate(45deg)',
                display: 'inline-block'
            })}>{String.fromCharCode(10010)}</div>
        </div>
        <div onClick={() => onToggle(id)} {...css({margin: '4px', opacity: isEnabled ? 1 : 0.5})}>
            <span {...css({margin: '0px 4px'})}>{type === AlarmType.HigherThan ? String.fromCharCode(8598) : String.fromCharCode(8601)}</span>
            <span>{temp.toFixed(2)} &#8451;</span>
        </div>
    </div>
);