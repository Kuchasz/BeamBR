import * as React from 'preact';
import {Alarm} from "../state";

interface Props extends Alarm{

}

export const AlarmListItem = ({isEnabled, minTemp, maxTemp}: Props) => (
    <div>
        <input type="checkbox" checked={isEnabled}/>
        <input type="number" value={minTemp.toString()}/>
        <input type="number" value={maxTemp.toString()}/>
    </div>
);