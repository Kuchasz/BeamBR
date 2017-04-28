import * as React from 'preact';
import {Network} from "../state";

interface Props extends Network{
    onClick: (ssid: string) => void;
}

export const NetworkListItem = ({onClick, ssid, strength, channel, isSecured}: Props) => (
    <div onClick={() => onClick(ssid)}>
        <div style={{margin: '5px', border: 'solid 1px black'}}>
            <span>{ssid}({channel})</span><span>{strength}({isSecured ? 'closed': 'open'})</span>
        </div>
    </div>
);