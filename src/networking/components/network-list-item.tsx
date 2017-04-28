import * as React from 'preact';
import {Network} from "../state";

interface Props extends Network{
    onClick: (ssid: string) => void;
    isSelected: boolean;
}

export const NetworkListItem = ({onClick, isSelected, ssid, strength, channel, isSecured}: Props) => (
    <div onClick={() => onClick(ssid)}>
        <div style={{margin: '5px', padding: '5px', border: 'solid 1px black', background: isSelected ? 'lightgray' : null}}>
            <span>{ssid}({channel})</span><span>{strength}({isSecured ? 'closed': 'open'})</span>
        </div>
    </div>
);