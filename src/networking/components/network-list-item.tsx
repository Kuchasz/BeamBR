import * as React from 'preact';
import {Network} from "../state";

export const NetworkListItem = ({name, strength, channel}: Network) => (
    <div>
        <div>{name}({channel})</div>
        <div>{strength}</div>
    </div>
);