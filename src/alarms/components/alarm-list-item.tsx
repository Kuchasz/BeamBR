import * as React from 'preact';
import {Alarm, AlarmType} from "../state";
import {css} from 'glamor';

interface Props extends Alarm {
    onClick: (alarmId: string) => void;
}

export const AlarmListItem = ({id, onClick, isEnabled, temp, type}: Props) => (
    <div onClick={() => onClick(id)} {...css({
        display: 'flex',
        alignItems: 'center',
        background: '#DDD',
        cursor: 'pointer',
        margin: '5px',
        opacity: isEnabled ? 1 : 0.5
    })}>
        <div {...css({
            transition: 'all 0.25s',
            ':hover': {
                background: 'red',
                '> div': {
                    transform: 'rotate(-45deg)'
                }
            }
        })}>
            <div {...css({
                margin: '4px',
                transition: 'all 0.25s',
                transform: 'rotate(45deg)',
                display: 'inline-block'
            })}>{String.fromCharCode(10010)}</div>
        </div>
        <div {...css({margin: '0px 4px'})}>{type === AlarmType.HigherThan ? String.fromCharCode(8598) : String.fromCharCode(8601)}</div>
        <div>{temp.toFixed(2)} &#8451;</div>
    </div>
);