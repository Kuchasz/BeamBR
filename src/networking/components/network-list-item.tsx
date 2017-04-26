import * as React from 'preact';
import {Network} from "../state";

interface Props extends Network{
    onClick: (ssid: string) => void;
}

export const NetworkListItem = ({onClick, ssid, strength, channel, isSecured}: Props) => (
    <div onClick={() => onClick(ssid)}>
        <div>{ssid}({channel})</div>
        <div>{strength}({isSecured ? 'closed': 'open'})</div>
    </div>
);