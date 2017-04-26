import * as React from 'preact';
import {Network} from "../state";

export const NetworkListItem = ({ssid, strength, channel, isSecured}: Network) => (
    <div>
        <div>{ssid}({channel})</div>
        <div>{strength}({isSecured ? 'closed': 'open'})</div>
    </div>
);